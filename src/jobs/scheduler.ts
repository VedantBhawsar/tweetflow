import cron from 'node-cron';
import { prisma } from '@/config/database';
import { TwitterService } from '@/services/twitter.service';

export class TweetScheduler {
  private twitterService = new TwitterService();

  start() {
    // Run every minute to check for scheduled tweets
    cron.schedule('* * * * *', async () => {
      await this.processScheduledTweets();
    });
  }

  private async processScheduledTweets() {
    try {
      const now = new Date();
      const scheduledTweets = await prisma.tweet.findMany({
        where: {
          scheduledAt: {
            lte: now,
          },
          postedAt: null,
        },
        include: {
          user: true,
        },
      });

      for (const tweet of scheduledTweets) {
        try {
          // Get user's Twitter access token (you'll need to implement this)
          const accessToken = await this.getUserTwitterToken(tweet.userId);

          if (accessToken) {
            await this.twitterService.postTweet(accessToken, tweet.content);

            // Update tweet as posted
            await prisma.tweet.update({
              where: { id: tweet.id },
              data: { postedAt: new Date() },
            });
          }
        } catch (error) {
          console.error(`Failed to post tweet ${tweet.id}:`, error);
          // Could implement retry logic or error handling here
        }
      }
    } catch (error) {
      console.error('Error processing scheduled tweets:', error);
    }
  }

  private async getUserTwitterToken(userId: string): Promise<string | null> {
    // Implementation to get user's Twitter access token
    // This would typically involve fetching from your accounts table
    return null;
  }
}
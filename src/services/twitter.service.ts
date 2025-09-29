import { TwitterAccount, Tweet } from '@/types';

export class TwitterService {
  private baseUrl = 'https://api.twitter.com/2';

  async postTweet(accessToken: string, content: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/tweets`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: content,
      }),
    });

    if (!response.ok) {
      throw new Error(`Twitter API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getUserProfile(accessToken: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/users/me`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Twitter API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getAnalytics(accessToken: string, userId: string): Promise<any> {
    // Implementation for Twitter analytics
    // Note: This requires Twitter API v2 with appropriate permissions
    const response = await fetch(`${this.baseUrl}/users/${userId}/tweets?tweet.fields=public_metrics`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Twitter API error: ${response.statusText}`);
    }

    return response.json();
  }
}
export async function apiRequest(endpoint: string, method: string, body?: any) {
    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || data.message || 'Something went wrong');
      }
  
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
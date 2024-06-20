export const fetchPostsAPI = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/posts/')
    if (!response.ok) {
      throw new Error('Network res is not ok')
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error('something is wrong!');
  }
}

export const addPostAPI = async (newPost: any) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/posts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });
    if (!response.ok) console.log(response);
  } catch (error) {
    console.error(error);
  }
  
}
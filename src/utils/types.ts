export interface Post {
  prompt: string;
  tag: string;
  _id?: string;
}

export interface Prompts extends Post {
  userId: string;
  creator?: {
    image: string;
    _id: string;
    email: string;
    username: string;
  };
  _id?: string;
}

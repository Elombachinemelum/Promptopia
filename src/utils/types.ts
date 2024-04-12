export interface Post {
  prompt: string;
  tag: string;
}

export interface Prompt extends Post {
  userId: string;
}

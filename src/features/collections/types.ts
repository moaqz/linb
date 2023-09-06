export type Visibility = "public" | "private";

export type Collection = {
  id: number;
  name: string;
  user_id: string;
  visibility: Visibility;
  created_at: Date | null;
};

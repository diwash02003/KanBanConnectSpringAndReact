export interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
  stage: "TO_DO" | "IN_PROGRESS" | "REVIEW" | "TESTING" | "COMPLETED";
}

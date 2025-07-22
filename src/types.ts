//Create the model for JobApplication 
export interface JobApplication {
  id: string;
  company: string;
  role: string;
  jobType: string;
  location: string;
  date: string;
  status: string;
  note: string;
}

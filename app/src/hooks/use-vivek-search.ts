import { vivekProjects } from "@/config/projects.vivek";
export function useVivekSearch(q:string){
 const s=q.toLowerCase();
 return vivekProjects.filter(p=>p.name.toLowerCase().includes(s)||p.description.toLowerCase().includes(s));
}

import { json } from "../https"
import type { Project } from "./types"

export async function getProjectByID(project_id: string): Promise<Project> {
    return json<Project>("/api/project/" + project_id)
}

export async function getAllProjects(): Promise<Project[]> {
    return json<Project[]>("/api/projects")
}
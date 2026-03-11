import * as repo from "@/repositories/admin.repository"

export const getContentService = async () => {

    return repo.getContentRepo()

}

export const updateContentService = async (data: any) => {

    return repo.updateContentRepo(data)

}
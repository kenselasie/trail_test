import { http } from "./base"

export const getUsersPostsService = async (userId: string) => {
    // TODO: use axios params if there is time.
    const path = `/posts?userId=${userId}`

    try {
        const { data } = await http.get(path)
        return await Promise.resolve(data)
    } catch (err) {
        return await Promise.reject(err)
    }
}
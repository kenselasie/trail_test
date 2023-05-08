import { http } from "./base"

export const getUsersService = async () => {
    const path = '/users'

    try {
        const { data } = await http.get(path)
        return await Promise.resolve(data)
    } catch (err) {
        return await Promise.reject(err)
    }
}
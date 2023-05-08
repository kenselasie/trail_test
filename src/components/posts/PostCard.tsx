import { X } from "react-feather";

interface ISinglePost {
    id: number | string
    userId?: number | string
    title: string
    body: string
    removePost: (id: number | string) => void
}
function PostCard({ id, title, body, removePost }: ISinglePost) {
  return (
    <>
        <div className="flex flex-col justify-center p-4">
            <div className="h-full">
                <div className="max-w-2xl mx-auto shadow-lg rounded-lg">
                    <div className="px-6 py-5">
                        <div className="flex items-start">
                            <div className="flex-grow truncate">
                                <div className="w-full sm:flex justify-between items-center mb-3">
                                    <h2 className="text-2xl leading-snug font-extrabold truncate mb-1 sm:mb-0">
                                        {title}
                                    </h2>
                                    <div className="flex-shrink-0 flex items-center space-x-3 sm:ml-2">
                                        <button onClick={() => removePost(id)} className="flex items-center text-left text-sm hover:text-white group focus-visible:border-b focus-visible:border-indigo-100">
                                            <X />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-end justify-between whitespace-normal">
                                    <div className="max-w-md">
                                        <p className="mb-2">{body}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default PostCard
import { EditPostForm } from '@/features/post-editor'
import type { GetPostByIdWithTagsResponse } from '@/server'
import { serverApi } from '@/server'
import { notFound } from 'next/navigation'

type Props = {
	params: {
		postId: string
	}
}

const EditPostPage = async ({ params }: Props) => {
	let post: GetPostByIdWithTagsResponse | undefined

	try {
		post = await serverApi.posts.getByIdWithTags({
			id: params.postId,
			isCreator: true,
		})
	} catch {
		post = undefined
	}

	if (!post) {
		return notFound()
	}

	return <EditPostForm defaultData={post} />
}

export default EditPostPage

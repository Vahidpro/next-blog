import { getPost } from "@/app/api/posts";
import { getUser } from "@/app/api/users";
import { Skeleton, SkeletonList } from "@/app/components/Skeleton";
import Link from "next/link";
import { Suspense } from "react";

export default function PostsPage({
	params: { postId },
}: {
	params: { postId: string };
}) {
	const post = getPost(postId);
	return (
		<>
			<Suspense
				fallback={
					<>
						<h1 className="page-title">
							<Skeleton
								inline
								short
							/>
						</h1>
						<span className="page-subtitle"></span>
						By:
						<Skeleton
							short
							inline
						/>
						<div>
							<Skeleton />
							<Skeleton />
							<Skeleton />
						</div>
					</>
				}
			>
				<PostsDetails postId={postId} />
			</Suspense>
			<h3 className="mt-4 mb-2">Comments</h3>
			<div className="card-stack">
				<Suspense
					fallback={
						<SkeletonList amount={5}>
							<div className="card">
								<div className="card-body">
									<div className="text-sm mb-1">
										<Skeleton short />
									</div>
									<Skeleton />
									<Skeleton />
								</div>
							</div>
						</SkeletonList>
					}
				>
					<Comments postId={postId} />
				</Suspense>
			</div>
		</>
	);
}

async function PostsDetails({ postId }: { postId: string }) {
	const post = await getPost(postId);
	const user = await getUser(post.userId);
	return (
		<>
			<h1 className="page-title">{post.title}</h1>
			<span className="page-subtitle">
				By:
				<Suspense
					fallback={
						<Skeleton
							inline
							short
						/>
					}
				>
					<UserDetails userId={post.userId} />
				</Suspense>
			</span>
			<div>{post.body}</div>
		</>
	);
}
async function UserDetails({ userId }: { userId: number }) {
	const user = await getUser(userId);
	return <Link href={`/users/${user.id}`}>{user.name}</Link>;
}

async function Comments({ postId }: { postId: string }) {
	const comments = await getPostComments(postId);

	return comments.map((comment) => (
		<div
			className="card"
			key={comment.id}
		>
			<div className="card-body">
				<div className="text-sm mb-1">{comment.body}</div>
			</div>
		</div>
	));
}

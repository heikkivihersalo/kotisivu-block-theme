/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";

/**
 * Styles
 */
import './editor.css';

/**
 * Internal dependencies
 */
import { usePosts } from '@hooks';
import { ErrorBoundary } from '@features/error';



const Edit = (props) => {
	const blockProps = useBlockProps({
		className: "blog-grid__container"
	});

	/**
	 * Get posts
	 */
	const posts = usePosts();

	/**
	 * Blog Card Element
	 * @param { object } data
	 * @return { JSX.Element }
	 */
	const BlogCard = ({ data }) => {
		return (
			<li className="blog-grid__item">
				<h3 className="blog-grid__title">{data?.title.rendered}</h3>
				<time className="blog-grid__date">{data?.date}</time>
				<p className="blog-grid__excerpt">{data?.excerpt.rendered}</p>
				<img className="blog-grid__image" src={data?.metadata?.featured_image.url} alt={data?.metadata?.featured_image.alt} title="" width={data?.metadata?.featured_image.width} height={data?.metadata?.featured_image.height} />
				<div className="blog-grid__button wp-block-button is-style-primary-fill">
					<a className="wp-block-button__link wp-element-button">{__('Read More', 'kotisivu-block-theme')}</a>
				</div>
			</li>
		)
	}

	/**
	 * Render posts for editor
	 */
	return (
		<div {...blockProps}>
			<ul id="blog-post-list" className="blog-grid__list">
				{!posts && __('Loading', 'kotisivu-block-theme')}
				{posts && posts.length === 0 && __('No posts', 'kotisivu-block-theme')}
				{posts && posts.length > 0 && (
					posts.map((post, index) => {
						return (
							<ErrorBoundary key={index}>
								<BlogCard key={index} data={post} />
							</ErrorBoundary>
						)
					})
				)}
			</ul>
		</div>
	);
};

export default Edit;
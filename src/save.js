/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';
import { RichText, MediaUpload, InspectorControls, ColorPalette } from '@wordpress/block-editor';
import { Button, PanelBody } from '@wordpress/components';
/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save(props) {
	const { attributes: {name, photoURL, quote} } = props
	const blockProps = useBlockProps.save()
	return (
		<div {...blockProps}>
			{ photoURL && (
				<img
					className="photo"
					src={ photoURL }
					alt={ name }
				/>
			) }
			<RichText.Content tagName='h2' value={name} />
			<RichText.Content tagName='p' className="quote" value={quote} />
		</div>
	);
}

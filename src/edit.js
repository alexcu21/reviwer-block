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

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import { RichText, MediaUpload, InspectorControls, ColorPalette } from '@wordpress/block-editor';
import { Button, PanelBody } from '@wordpress/components';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {

	const {
		attributes: {name, photoURL, photoID, quote, quoteColor}, setAttributes
	} = props

	const onChangeName = (value) => {
		setAttributes( { name: value } )
	}

	const onSelectImage = (photo) => {
		setAttributes({
			photoURL: photo.url,
			photoID: photo.id,
		})
	}

	const onChangeQuote = (value) => {
		setAttributes( { quote: value } )
	}

	const onChangeColor = (newColor) => {
		setAttributes( { quoteColor: newColor } )
	}

	const blockProps = useBlockProps()

	return (
		<div {...blockProps}>
			<div className="photo">
				<InspectorControls>
					<PanelBody title='Review Color'>
						<label className="components-base-control__label">
                            review's Color
                        </label>
                        <ColorPalette
                            onChange={onChangeColor}
                        />
					</PanelBody>
				</InspectorControls>
				<MediaUpload
					onSelect={ onSelectImage }
					allowedTypes="image"
					value={ photoID }
					render={ ( { open } ) => (
						<Button
							className={
								photoID ? 'image-button' : 'button button-large'
							}
							onClick={ open }
						>
							{ ! photoID ? 'Upload Image' : (
								<img
									src={ photoURL }
									alt={ name }
								/>
							) }
						</Button>
					) }
				/>
			</div>
			<RichText
				tagName='h2'
				placeholder="Write reviewer's name"
				value={name}
				onChange={onChangeName}
			/>
			<RichText
					tagName='p'
					placeholder='Write the review'
					value={quote}
					onChange={onChangeQuote}
					className="quote"
					style={{color:quoteColor}}
			/>
		
		</div>
	);
}

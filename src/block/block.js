/**
 * BLOCK: quill-block
 *
 * Quill rich text editor block
 *
 * @uses https://github.com/zenoamaro/react-quill
 * @uses https://github.com/punkave/sanitize-html
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

// Import React Quill
const ReactQuill = require('react-quill');

// Import sanitize-html
const sanitizeHtml = require('sanitize-html');

const RawHTML = wp.element.RawHTML;



/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'tfr/quill-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Quill Block' ), // Block title.
	icon: 'welcome-write-blog', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Quill' ),
		__( 'Rich Text' ),
		__( 'Editor' ),
	],
	attributes: {
		rich_text: {
			type: 'string',
			selector: 'div',
			source: 'html',
			query: {
				p: {
					type: 'string',
					source: 'element',
					selector: 'p'
				},
				h2: {
					type: 'string',
					source: 'element',
					selector: 'h2'
				},
				h3: {
					type: 'string',
					source: 'element',
					selector: 'h3'
				},
			}
		}
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit ( { className, attributes, setAttributes, isSelected } ) {
		// Get RichText component
		// const { RichText } = wp.editor
		// const { TextareaControl } = wp.components

		let rich_text	= attributes.rich_text

    const onChangeContentParagraph = content => {
      setAttributes({rich_text: content})
    }

    if(isSelected) {
      return (
        <div className={ className } id={'tfr-content'}>

          <ReactQuill
            onChange={onChangeContentParagraph} // onChange event callback
            value={rich_text} // Binding
            placeholder="Name of the link"
          />
        </div>
      );
		} else {
    	return wp.element.createElement( RawHTML, null, sanitizeHtml( rich_text ));
		}

	},

	/**createElement
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save ( props ) {
	    return wp.element.createElement( RawHTML, null, props.attributes.rich_text);
	},
});

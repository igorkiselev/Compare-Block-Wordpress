(function(blocks, i18n, element, components, blockEditor) {
    const el = element.createElement;
    const useBlockProps = blockEditor.useBlockProps;
    
    const icon = el("svg", {
        width: 36,
        height: 36
    }, el("path", {
        d: " M4 18V6C4 4.9 4.9 4 6 4H9V5.5H6C5.7 5.5 5.5 5.7 5.5 6V18C5.5 18.3 5.7 18.5 6 18.5H9V20H6C4.9 20 4 19.1 4 18ZM12.7 22H11.2V13.8336C10.4936 13.525 10 12.8201 10 12C10 11.1799 10.4936 10.475 11.2 10.1664V2H12.7V10.1259C13.4593 10.4097 14 11.1417 14 12C14 12.8583 13.4593 13.5903 12.7 13.8741V22ZM16.5 5.5H15V4H16.5V5.5ZM20 6H18.5C18.5 5.7 18.3 5.5 18 5.5V4C19.1 4 20 4.9 20 6ZM20 16.5H18.5V14.5H20V16.5ZM20 13H18.5V11H20V13ZM18 20V18.5C18.3 18.5 18.5 18.3 18.5 18H20C20 19.1 19.1 20 18 20ZM16.5 20H15V18.5H16.5V20ZM20 9.5H18.5V7.5H20V9.5Z"
    }));
   
    
    
    blocks.registerBlockType("jbn/compare", {
        title: i18n.__("Compare"),
        category: "jbn",
        apiVersion: 2,
        icon: icon,
        supports: {},
        attributes: {
            before_id: {
                type: "number"
            },
            before_url: {
                type: "string"
            },
            after_id: {
                type: "number"
            },
            after_url: {
                type: "string"
            }
        },
        edit: function(props) {
            
            const blockProps = useBlockProps();
            
            const instructions = el('p', {}, i18n.__('To edit the background image, you need permission to upload media.'));

            return [el(wp.element.Fragment, {},
                        el(wp.blockEditor.InspectorControls, { key: "inspector"},
                            el(wp.components.PanelBody, { title: i18n.__("Settings")},
                                el(wp.blockEditor.MediaUploadCheck, { fallback: instructions},
                                    el(wp.blockEditor.MediaUpload, {
                                        title: i18n.__("Before Image"),
                                        onSelect: media => props.setAttributes({
                                            before_id: parseFloat(media.id),
                                            before_url: media.url,
                                        }),
                                        value: props.attributes.before_id,
                                        render: ({ open: open }) => el(wp.components.Button,
                                            {className: "button", onClick: open},
                                            props.attributes.before_id ? props.attributes.before_id : i18n.__("Set before image")
                                        )
                                    })
                                ),
                                el(wp.blockEditor.MediaUploadCheck, { fallback: instructions},
                                    el(wp.blockEditor.MediaUpload, {
                                        title: i18n.__("After Image"),
                                        onSelect: media => props.setAttributes({
                                            after_id: parseFloat(media.id),
                                            after_url: media.url,
                                        }),
                                        value: props.attributes.after_id,
                                        render: ({ open: open }) => el(wp.components.Button,
                                            {className: "button", onClick: open},
                                            props.attributes.after_id ? props.attributes.after_id : i18n.__("Set after image")
                                        )
                                    })
                                )
                            )
                        )
                    ),
                    el("div", blockProps, 
                        el("div", { style : { "position" : "relative",}
                    },
                        el("div", {
                            style : {
                                "width" : "50%",
                                "position" : "absolute",
                                "overflow" : "hidden",
                                "backgroundImage" : "url('" +props.attributes.before_url + "')",
                                "backgroundSize" : "cover",
                                "backgroundPosition" : 'left',
                                "borderRight" : "2px Dashed #000",
                                "height" : "100%"
                            }
                        }),
                        el("div", {}, el("img", { 'src' : props.attributes.after_url})
                        ),
                    )
                )];
        },
        save: function(props) {
            const blockProps = useBlockProps.save();
            return [el("div", blockProps, 
                el("img", { 'src' : props.attributes.before_url }),
                el("img", { 'src' : props.attributes.after_url })
            )];
        }
    });
})(window.wp.blocks, window.wp.i18n, window.wp.element, window.wp.components, window.wp.blockEditor);
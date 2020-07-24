
// let summernote = $('#summerNoteTextEditor')
let summernote = $('.summerNoteTextEditor')

summernote.summernote({
	styleTags: [
		'p',
		{ title: 'Blockquote', tag: 'blockquote', className: 'blockquote', value: 'blockquote' },
		'pre',
		'h1',
		'h2',
		'h3',
		'h4',
		'h5',
		'h6',
	],
	height:200,
	focus: true,
    tabsize: 2,
    placeholder:'Enter anything here...'
    ,
	popover: {
		link: [['link', ['linkDialogShow', 'unlink']]],
		table: [
			['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
			['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
		],
		air: [
			['color', ['color']],
			['font', ['bold', 'underline', 'clear']],
			['para', ['ul', 'paragraph']],
			['table', ['table']],
			['insert', ['link', 'picture']],
		],
	},
	toolbar: [
		['style', ['style']],
		['font', ['bold', 'underline', 'clear']],
		['fontsize', ['fontsize']],
		['fontname', ['fontname']],
		['color', ['color']],
		['para', ['ul', 'ol', 'paragraph']],
		['table', ['table']],
		['insert', ['link']],
		['view', ['codeview', 'help']],
	],
})

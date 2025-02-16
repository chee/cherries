export default {
	name: "lychee" as const,
	type: "light" as const,
	settings: [],
	colors: {
		"editor.background": "#ffffff",
		"editor.foreground": "#000000",
		"statusBar.noFolderBackground": "#f9fcff",
		"statusBar.noFolderForeground": "#b3e6ffcc",
		"statusBar.debuggingBackground": "#086F8A",
		"statusBar.debuggingForeground": "#ffffff",
		"statusBar.background": "#d5f6ea",
		"statusBar.foreground": "#334455",
		"activityBar.background": "#d5f6ea",
		"activityBar.foreground": "#334455",
		"tab.inactiveBackground": "#f9fcff",
		"tab.activeBackground": "#ffffff",
		"tab.inactiveForeground": "#086F8A",
		"tab.activeForeground": "#000000",
		"tab.border": "#f9fcff",
		"menu.background": "#f9fcff",
		"menu.foreground": "#086F8A",
		"statusBarItem.activeBackground": "#d5f6ea",
		"statusBarItem.prominentHoverBackground": "#e3f6ff",
		"statusBarItem.errorBackground": "#ff2a50",
		"statusBarItem.errorForeground": "#f9fcff",
		"statusBarItem.hoverBackground": "#ffffff",
		"statusBarItem.prominentBackground": "#bbccdd",
		"statusBarItem.prominentForeground": "#ffffff",
		"sideBar.background": "#f9fcff",
		"sideBar.foreground": "#086F8A",
		"sideBarSectionHeader.background": "#f9fcff",
		"sideBarSectionHeader.foreground": "#086F8A",
		"sideBar.dropBackground": "#e3f6ff",
		"editorCursor.background": "#ffffff",
		"editorCursor.foreground": "#ee046f",
		"activityBarBadge.background": "#d5f6ea",
		"activityBarBadge.foreground": "#000000",
		"panel.background": "#f9fcff",
		"panel.foreground": "#086F8A",
		"titleBar.activeBackground": "#d5f6ea",
		"titleBar.activeForeground": "#334455",
		"titleBar.inactiveBackground": "#f9fcff",
		"titleBar.inactiveForeground": "#086F8A",
		"breadcrumb.background": "#fff9fd",
		"breadcrumb.foreground": "#566b7F",
		"selection.background": "#e3f6ff",
		"editorGroupHeader.tabsBackground": "#f9fcff",
		"editorGroupHeader.border": "#ffffff",
	},
	tokenColors: [
		{
			name: "Comments",
			scope: ["comment", "punctuation.definition.comment"],
			settings: {
				fontStyle: "italic",
				foreground: "#8899aa",
			},
		},
		{
			name: "Comments: Preprocessor",
			scope: "comment.block.preprocessor",
			settings: {
				fontStyle: "",
				foreground: "#566b7F",
			},
		},
		{
			name: "Comments: Documentation",
			scope: ["comment.documentation", "comment.block.documentation"],
			settings: {
				foreground: "#253240",
			},
		},
		{
			name: "Invalid - Illegal",
			scope: "invalid.illegal",
			settings: {
				foreground: "#ff2a50",
			},
		},
		{
			name: "Operators",
			scope: "keyword.operator",
			settings: {
				foreground: "#086F8A",
			},
		},
		{
			name: "Boolean",
			scope: "constant.language.boolean",
			settings: {
				fontStyle: "bold",
				foreground: "#208776",
			},
		},
		{
			name: "Keywords",
			scope: ["keyword", "storage"],
			settings: {
				foreground: "#810005",
			},
		},
		{
			name: "Types",
			scope: ["storage.type", "support.type"],
			settings: {
				foreground: "#0CADD6",
			},
		},
		{
			name: "Language Constants",
			scope: ["constant.language", "support.constant", "variable.language"],
			settings: {
				fontStyle: "bold",
				foreground: "#ee046f",
			},
		},
		{
			name: "Variables",
			scope: ["variable", "support.variable"],
			settings: {
				foreground: "#ff552a",
			},
		},
		{
			name: "Functions",
			scope: ["entity.name.function", "support.function"],
			settings: {
				foreground: "#3999FF",
			},
		},
		{
			name: "Classes",
			scope: ["entity.name.type", "support.class"],
			settings: {
				fontStyle: "bold",
				foreground: "#DB4E80",
			},
		},
		{
			name: "Classes",
			scope: ["entity.name.type", "entity.other.inherited-class"],
			settings: {
				foreground: "#208776",
			},
		},
		{
			name: "Exceptions",
			scope: "entity.name.exception",
			settings: {
				foreground: "#fa2573",
			},
		},
		{
			name: "Sections",
			scope: "entity.name.section",
			settings: {
				fontStyle: "bold",
			},
		},
		{
			name: "Numbers, Characters",
			scope: ["constant.numeric", "constant.character", "constant"],
			settings: {
				foreground: "#3999FF",
			},
		},
		{
			name: "Strings",
			scope: "string",
			settings: {
				background: "#B1D5D1",
				foreground: "#208776",
			},
		},
		{
			name: "Strings: Escape Sequences",
			scope: "constant.character.escape",
			settings: {
				foreground: "#000000",
			},
		},
		{
			name: "Strings: Regular Expressions",
			scope: "string.regexp",
			settings: {
				foreground: "#3999FF",
			},
		},
		{
			name: "Strings: Symbols",
			scope: "constant.other.symbol",
			settings: {
				foreground: "#208776",
			},
		},
		{
			name: "Punctuation",
			scope: "punctuation",
			settings: {
				foreground: "#086F8A",
			},
		},
		{
			name: "HTML: Doctype Declaration",
			scope: [
				"meta.tag.sgml.doctype",
				"meta.tag.sgml.doctype string",
				"meta.tag.sgml.doctype entity.name.tag",
				"meta.tag.sgml punctuation.definition.tag.html",
			],
			settings: {
				foreground: "#ee046f",
			},
		},
		{
			name: "HTML: Tags",
			scope: [
				"meta.tag",
				"punctuation.definition.tag.html",
				"punctuation.definition.tag.begin.html",
				"punctuation.definition.tag.end.html",
			],
			settings: {
				foreground: "#66629f",
			},
		},
		{
			name: "HTML: Tag Names",
			scope: "entity.name.tag",
			settings: {
				foreground: "#66629f",
			},
		},
		{
			name: "HTML: Attribute Names",
			scope: [
				"meta.tag entity.other.attribute-name",
				"entity.other.attribute-name.html",
			],
			settings: {
				fontStyle: "italic",
				foreground: "#DB4E80",
			},
		},
		{
			name: "HTML: Entities",
			scope: ["constant.character.entity", "punctuation.definition.entity"],
			settings: {
				foreground: "#0CADD6",
			},
		},
		{
			name: "CSS: Selectors",
			scope: [
				"meta.selector",
				"meta.selector entity",
				"meta.selector entity punctuation",
				"entity.name.tag.css",
			],
			settings: {
				foreground: "#66629f",
			},
		},
		{
			name: "CSS: Property Names",
			scope: ["meta.property-name", "support.type.property-name"],
			settings: {
				foreground: "#ff552a",
			},
		},
		{
			name: "CSS: Property Values",
			scope: [
				"meta.property-value",
				"meta.property-value constant.other",
				"support.constant.property-value",
			],
			settings: {
				foreground: "#086F8A",
			},
		},
		{
			name: "CSS: Important Keyword",
			scope: "keyword.other.important",
			settings: {
				fontStyle: "bold",
			},
		},
		{
			name: "Markup: Changed",
			scope: "markup.changed",
			settings: {
				foreground: "#086F8A",
			},
		},
		{
			name: "Markup: Deletion",
			scope: "markup.deleted",
			settings: {
				foreground: "#ee046f",
			},
		},
		{
			name: "Markup: Emphasis",
			scope: "markup.italic",
			settings: {
				fontStyle: "italic",
			},
		},
		{
			name: "Markup: Error",
			scope: "markup.error",
			settings: {
				foreground: "#ff2a50",
			},
		},
		{
			name: "Markup: Insertion",
			scope: "markup.inserted",
			settings: {
				foreground: "#96E8CB",
			},
		},

		{
			name: "Markup: Output",
			scope: ["markup.output", "markup.raw"],
			settings: {
				foreground: "#000000",
			},
		},
		{
			name: "Markup: Prompt",
			scope: "markup.prompt",
			settings: {
				foreground: "#086F8A",
			},
		},
		{
			name: "Markup: Heading",
			scope: "markup.heading",
			settings: {
				foreground: "#086F8A",
				fontStyle: "bold",
			},
		},
		{
			name: "Markup: Strong",
			scope: "markup.bold",
			settings: {
				fontStyle: "bold",
			},
		},
		{
			name: "Markup: Traceback",
			scope: "markup.traceback",
			settings: {
				foreground: "#DB4E80",
			},
		},
		{
			name: "Markup: Underline",
			scope: "markup.underline",
			settings: {
				fontStyle: "underline",
			},
		},
		{
			name: "Markup Quote",
			scope: "markup.quote",
			settings: {
				foreground: "#253240",
			},
		},
		{
			name: "Markup Lists",
			scope: "markup.list",
			settings: {
				foreground: "#1d2833",
			},
		},
		{
			name: "Markup Styling",
			scope: ["markup.bold", "markup.italic"],
			settings: {
				foreground: "#8887ac",
			},
		},
		{
			name: "Markup Inline",
			scope: "markup.inline.raw",
			settings: {
				foreground: "#66629f",
			},
		},
		{
			name: "markdown text",
			scope: ["meta.paragraph.markdown"],
			settings: {
				foreground: "#000000",
			},
		},
		{
			name: "Link",
			scope: [
				"meta.link",
				"markup.underline.link.image.markdown",
				"markup.underline.link.markdown",
			],
			settings: {
				fontStyle: "underline",
				foreground: "#3999FF",
			},
		},
		{
			scope: [
				"markup.inline.raw.string.markdown",
				"markup.fenced_code.block.markdown",
			],
			settings: {
				foreground: "#000000",
			},
		},
		{
			name: "Extra: Diff Range",
			scope: ["meta.diff.range", "meta.diff.index", "meta.separator"],
			settings: {
				foreground: "#000000",
			},
		},
		{
			name: "Extra: Diff From",
			scope: "meta.diff.header.from-file",
			settings: {
				foreground: "#000000",
			},
		},
		{
			name: "Extra: Diff To",
			scope: "meta.diff.header.to-file",
			settings: {
				foreground: "#000000",
			},
		},
		{
			name: "Markdown attributes",
			scope: "fenced_code.block.language.attributes.markdown",
			settings: {
				fontStyle: "italic",
				foreground: "#086F8A",
			},
		},
	],
}

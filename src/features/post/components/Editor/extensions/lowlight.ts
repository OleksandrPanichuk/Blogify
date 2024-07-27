import bash from 'highlight.js/lib/languages/bash'
import cpp from 'highlight.js/lib/languages/cpp'
import csharp from 'highlight.js/lib/languages/csharp'
import dart from 'highlight.js/lib/languages/dart'
import django from 'highlight.js/lib/languages/django'
import dockerfile from 'highlight.js/lib/languages/dockerfile'
import go from 'highlight.js/lib/languages/go'
import graphql from 'highlight.js/lib/languages/graphql'
import java from 'highlight.js/lib/languages/java'
import js from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import pgsql from 'highlight.js/lib/languages/pgsql'
import python from 'highlight.js/lib/languages/python'
import ruby from 'highlight.js/lib/languages/ruby'
import scss from 'highlight.js/lib/languages/scss'
import swift from 'highlight.js/lib/languages/swift'
import ts from 'highlight.js/lib/languages/typescript'
import yaml from 'highlight.js/lib/languages/yaml'
import rust from 'highlight.js/lib/languages/rust'
import { createLowlight } from 'lowlight'



const lowlight = createLowlight({
	ts,
	java,
	js,
	scss,
	cpp,
	dart,
	go,
	csharp,
	python,
	swift,
	ruby,
	pgsql,
	yaml,
	json,
	django,
	bash,
	graphql,
	dockerfile,
	rust
})

lowlight.register({})


export {lowlight}
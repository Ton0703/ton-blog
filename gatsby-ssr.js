import React from "react"
import { MDXProvider } from "@mdx-js/react"
import "./src/styles/global.scss"
import { Code } from "./src/components/Code"
import { preToCodeBlock } from "mdx-utils"
import "./language-tabs.css"

const components = {
  pre: preProps => {
    const props = preToCodeBlock(preProps)
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <Code {...props} />
    } else {
      // it's possible to have a pre without a code in it
      return <pre {...preProps} />
    }
  },
  wrapper: ({children}) => <>{children}</>
}

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
)
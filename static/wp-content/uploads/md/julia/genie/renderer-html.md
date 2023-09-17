```julia
normal_element(f::Function, elem::String, attrs::Vector{Pair{Symbol,Any}} = Pair{Symbol,Any}[]) :: HTMLString
```
Generates a HTML element in the form <...></...>

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L131-L135)[`Genie.Renderer.Html.prepare_template`](#Genie.Renderer.Html.prepare_template) — Function
```julia
prepare_template(s::String)
prepare_template{T}(v::Vector{T})
```
Cleans up the template before rendering (ex by removing empty nodes).

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L224-L229)[`Genie.Renderer.Html.attributes`](#Genie.Renderer.Html.attributes) — Function
```julia
attributes(attrs::Vector{Pair{Symbol,String}} = Vector{Pair{Symbol,String}}()) :: Vector{String}
```
Parses HTML attributes.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L242-L246)[`Genie.Renderer.Html.parseattr`](#Genie.Renderer.Html.parseattr) — Function
```julia
parseattr(attr) :: String
```
Converts Julia keyword arguments to HTML attributes with illegal Julia chars.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L280-L284)[`Genie.Renderer.Html.normalize_element`](#Genie.Renderer.Html.normalize_element) — Function
```julia
normalize_element(elem::String)
```
Cleans up problematic characters or DOM elements.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L301-L305)[`Genie.Renderer.Html.denormalize_element`](#Genie.Renderer.Html.denormalize_element) — Function
```julia
denormalize_element(elem::String)
```
Replaces `-` with the char defined to replace dashes, as Julia does not support them in names.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L311-L315)[`Genie.Renderer.Html.void_element`](#Genie.Renderer.Html.void_element) — Function
```julia
void_element(elem::String, attrs::Vector{Pair{Symbol,String}} = Vector{Pair{Symbol,String}}()) :: HTMLString
```
Generates a void HTML element in the form <...>

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L323-L327)Missing docstring.Missing docstring for `skip_element`. Check Documenter's build log for details.

Missing docstring.Missing docstring for `include_markdown`. Check Documenter's build log for details.

`Genie.Renderer.Html.get_template` — Function
```julia
get_template(path::String; partial::Bool = true, context::Module = @__MODULE__, vars...) :: Function
```
Resolves the inclusion and rendering of a template file

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L338-L342)[`Genie.Renderer.Html.doctype`](#Genie.Renderer.Html.doctype) — FunctionOutputs document's doctype.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L367-L369)[`Genie.Renderer.Html.doc`](#Genie.Renderer.Html.doc) — FunctionOutputs document's doctype.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L375-L377)[`Genie.Renderer.Html.parseview`](#Genie.Renderer.Html.parseview) — Function
```julia
parseview(data::String; partial = false, context::Module = @__MODULE__) :: Function
```
Parses a view file, returning a rendering function. If necessary, the function is JIT-compiled, persisted and loaded into memory.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L386-L390)[`Genie.Renderer.Html.render`](#Genie.Renderer.Html.render) — Function
```julia
render(data::String; context::Module = @__MODULE__, layout::Union{String,Nothing} = nothing, vars...) :: Function
```
Renders the string as an HTML view.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L412-L416)
```julia
render(viewfile::Genie.Renderer.FilePath; layout::Union{Nothing,Genie.Renderer.FilePath} = nothing, context::Module = @__MODULE__, vars...) :: Function
```
Renders the template file as an HTML view.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L429-L433)[`Genie.Renderer.Html.parsehtml`](#Genie.Renderer.Html.parsehtml) — Function
```julia
parsehtml(input::String; partial::Bool = true) :: String
```
[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L455-L459)
```julia
parsehtml(elem, output; partial = true) :: String
```
Parses a HTML tree structure into a `string` of Julia code.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L768-L772)[`Genie.Renderer.render`](#Genie.Renderer.render) — Function
```julia
render
```
Abstract function that needs to be specialized by individual renderers.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Renderer.jl#L169-L173)[`Genie.Renderer.Html.html`](#Genie.Renderer.Html.html) — Function
```julia
html(data::String; context::Module = @__MODULE__, status::Int = 200, headers::HTTPHeaders = HTTPHeaders(), layout::Union{String,Nothing} = nothing, vars...) :: HTTP.Response
```
Parses the `data` input as HTML, returning a HTML HTTP Response.

**Arguments**

* `data::String`: the HTML string to be rendered
* `context::Module`: the module in which the variables are evaluated (in order to provide the scope for vars). Usually the controller.
* `status::Int`: status code of the response
* `headers::HTTPHeaders`: HTTP response headers
* `layout::Union{String,Nothing}`: layout file for rendering `data`

**Example**


```julia
julia> html("<h1>Welcome $(vars(:name))</h1>", layout = "<div><% @yield %></div>", name = "Adrian")
HTTP.Messages.Response:
"
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8

<html><head></head><body><div><h1>Welcome Adrian</h1>
</div></body></html>"
```
[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L510-L533)
```julia
html(md::Markdown.MD; context::Module = @__MODULE__, status::Int = 200, headers::Genie.Renderer.HTTPHeaders = Genie.Renderer.HTTPHeaders(), layout::Union{String,Nothing} = nothing, forceparse::Bool = false, vars...) :: Genie.Renderer.HTTP.Response
```
Markdown view rendering

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L597-L601)
```julia
html(viewfile::FilePath; layout::Union{Nothing,FilePath} = nothing,
      context::Module = @__MODULE__, status::Int = 200, headers::HTTPHeaders = HTTPHeaders(), vars...) :: HTTP.Response
```
Parses and renders the HTML `viewfile`, optionally rendering it within the `layout` file. Valid file format is `.html.jl`.

**Arguments**

* `viewfile::FilePath`: filesystem path to the view file as a `Renderer.FilePath`, ie `Renderer.filepath("/path/to/file.html.jl")` or `path"/path/to/file.html.jl"`
* `layout::FilePath`: filesystem path to the layout file as a `Renderer.FilePath`, ie `Renderer.FilePath("/path/to/file.html.jl")` or `path"/path/to/file.html.jl"`
* `context::Module`: the module in which the variables are evaluated (in order to provide the scope for vars). Usually the controller.
* `status::Int`: status code of the response
* `headers::HTTPHeaders`: HTTP response headers
[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L618-L630)[`Genie.Renderer.Html.safe_attr`](#Genie.Renderer.Html.safe_attr) — Function
```julia
safe_attr(attr) :: String
```
Replaces illegal Julia characters from HTML attributes with safe ones, to be used as keyword arguments.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L641-L645)Missing docstring.Missing docstring for `parsehtml`. Check Documenter's build log for details.

`Genie.Renderer.Html.html_to_julia` — Function
```julia
html_to_julia(file_path::String; partial = true) :: String
```
Converts a HTML document to Julia code.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L868-L872)[`Genie.Renderer.Html.string_to_julia`](#Genie.Renderer.Html.string_to_julia) — Function
```julia
string_to_julia(content::String; partial = true, f_name::Union{Symbol,Nothing} = nothing, prepend = "") :: String
```
Converts string view data to Julia code

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L878-L882)[`Genie.Renderer.Html.to_julia`](#Genie.Renderer.Html.to_julia) — Function
```julia
to_julia(input::String, f::Function; partial = true, f_name::Union{Symbol,Nothing} = nothing, prepend = "") :: String
```
Converts an input file to Julia code

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L893-L897)[`Genie.Renderer.Html.partial`](#Genie.Renderer.Html.partial) — Function
```julia
partial(path::String; context::Module = @__MODULE__, vars...) :: String
```
Renders (includes) a view partial within a larger view or layout file.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L923-L927)[`Genie.Renderer.Html.template`](#Genie.Renderer.Html.template) — Function
```julia
template(path::String; partial::Bool = true, context::Module = @__MODULE__, vars...) :: String
```
Renders a template file.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L943-L947)[`Genie.Renderer.Html.read_template_file`](#Genie.Renderer.Html.read_template_file) — Function
```julia
read_template_file(file_path::String) :: String
```
Reads `file_path` template from disk.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L961-L965)[`Genie.Renderer.Html.parse_template`](#Genie.Renderer.Html.parse_template) — Function
```julia
parse_template(file_path::String; partial = true) :: String
```
Parses a HTML file into Julia code.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L980-L984)[`Genie.Renderer.Html.parse_string`](#Genie.Renderer.Html.parse_string) — Function
```julia
parse_string(data::String; partial = true) :: String
```
Parses a HTML string into Julia code.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L990-L994)Missing docstring.Missing docstring for `parse`. Check Documenter's build log for details.

Missing docstring.Missing docstring for `parsetags`. Check Documenter's build log for details.

`Genie.Renderer.Html.register_elements` — Function
```julia
register_elements() :: Nothing
```
Generated functions that represent Julia functions definitions corresponding to HTML elements.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L1012-L1016)[`Genie.Renderer.Html.register_element`](#Genie.Renderer.Html.register_element) — Function
```julia
register_element(elem::Union{Symbol,String}, elem_type::Union{Symbol,String} = :normal; context = @__MODULE__) :: Nothing
```
Generates a Julia function representing an HTML element.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L1034-L1038)[`Genie.Renderer.Html.register_normal_element`](#Genie.Renderer.Html.register_normal_element) — Function
```julia
register_normal_element(elem::Union{Symbol,String}; context = @__MODULE__) :: Nothing
```
Generates a Julia function representing a "normal" HTML element: that is an element with a closing tag, <tag>...</tag>

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L1047-L1051)[`Genie.Renderer.Html.register_void_element`](#Genie.Renderer.Html.register_void_element) — Function
```julia
register_void_element(elem::Union{Symbol,String}; context::Module = @__MODULE__) :: Nothing
```
Generates a Julia function representing a "void" HTML element: that is an element without a closing tag, <tag />

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L1083-L1087)Missing docstring.Missing docstring for `attr`. Check Documenter's build log for details.

`Genie.Renderer.Html.for_each` — Function
```julia
for_each(f::Function, v)
```
Iterates over the `v` Vector and applies function `f` for each element. The results of each iteration are concatenated and the final string is returned.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L1101-L1106)[`Genie.Renderer.Html.collection`](#Genie.Renderer.Html.collection) — Function
```julia
collection(template::Function, collection::Vector{T})::String where {T}
```
Creates a view fragment by repeateadly applying a function to each element of the collection.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L1126-L1130)[`Genie.Router.error`](#Genie.Router.error) — Function
```julia
error
```
Not implemented function for error response.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Router.jl#L1223-L1227)[`Genie.Renderer.Html.serve_error_file`](#Genie.Renderer.Html.serve_error_file) — Function
```julia
serve_error_file(error_code::Int, error_message::String = "", params::Dict{Symbol,Any} = Dict{Symbol,Any}()) :: Response
```
Serves the error file correspoding to `error_code` and current environment.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L1172-L1176)[`Genie.Renderer.Html.@yield`](#Genie.Renderer.Html.@yield) — Macro
```julia
@yield
```
Outputs the rendering of the view within the template.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/renderers/Html.jl#L1221-L1225)Missing docstring.Missing docstring for `el`. Check Documenter's build log for details.


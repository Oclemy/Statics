
Helper function to add a file route to the assets based on asset_config and filename.

**Example**


```julia
add_fileroute(StippleUI.assets_config, "Sortable.min.js")
add_fileroute(StippleUI.assets_config, "vuedraggable.umd.min.js")
add_fileroute(StippleUI.assets_config, "vuedraggable.umd.min.js.map", type = "js")
add_fileroute(StippleUI.assets_config, "QSortableTree.js")

draggabletree_deps() = [
  script(src = "/stippleui.jl/master/assets/js/sortable.min.js")
  script(src = "/stippleui.jl/master/assets/js/vuedraggable.umd.min.js")
  script(src = "/stippleui.jl/master/assets/js/qsortabletree.js")
]
Stipple.DEPS[:qdraggabletree] = draggabletree_deps
```
[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Assets.jl#L281-L305)[`Genie.Assets.AssetsConfig`](#Genie.Assets.AssetsConfig) — Type
```julia
mutable struct AssetsConfig
```
Manages the assets configuration for the current package. Define your own instance of AssetsConfig if you want to add support for asset management for your package through Genie.Assets.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Assets.jl#L16-L21)[`Genie.Assets.assets_config!`](#Genie.Assets.assets_config!) — Function
```julia
assets_config!(packages::Vector{Module}; config...) :: Nothing
assets_config!(package::Module; config...) :: Nothing
```
Utility function which allows bulk configuration of the assets.

**Example**


```julia
Genie.Assets.assets_config!([Genie, Stipple, StippleUI], host = "https://cdn.statically.io/gh/GenieFramework")
```
[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Assets.jl#L39-L50)
```julia
assets_config!(; config...) :: Nothing
```
Updates the assets configuration for the current package.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Assets.jl#L67-L71)Missing docstring.Missing docstring for `assets_endpoint`. Check Documenter's build log for details.

`Genie.Assets.asset_file` — Function
```julia
asset_file(; cwd = "", file::String, path::String = "", type::String = "", prefix::String = "assets",
              ext::String = "", min::Bool = false, skip_ext::Bool = false) :: String
```
Generates the file system path to an asset file.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Assets.jl#L161-L166)[`Genie.Assets.asset_path`](#Genie.Assets.asset_path) — Function
```julia
asset_path(; file::String, host::String = Genie.config.base_path, package::String = "", version::String = "",
              prefix::String = "assets", type::String = "", path::String = "", min::Bool = false,
              ext::String = "", skip_ext::Bool = false, query::String = "") :: String
asset_path(file::String; kwargs...) :: String
asset_path(ac::AssetsConfig, tp::Union{Symbol,String}; type::String = string(tp), path::String = "",
                file::String = "", ext::String = "", skip_ext::Bool = false, query::String = "") :: String
```
Generates the path to an asset file.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Assets.jl#L94-L103)[`Genie.Assets.asset_route`](#Genie.Assets.asset_route) — Function
```julia
asset_route(; file::String, package::String = "", version::String = "", prefix::String = "assets",
              type::String = "", path::String = "", min::Bool = false,
              ext::String = "", skip_ext::Bool = false, query::String = "") :: String
asset_route(file::String; kwargs...) :: String
asset_route(ac::AssetsConfig, tp::Union{Symbol,String}; type::String = string(tp), path::String = "",
            file::String = "", ext::String = "", skip_ext::Bool = false, query::String = "") :: String
```
Generates the route to an asset file.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Assets.jl#L129-L138)[`Genie.Assets.channels`](#Genie.Assets.channels) — Function
```julia
channels(channel::AbstractString = Genie.config.webchannels_default_route) :: String
```
Outputs the `channels.js` file included with the Genie package.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Assets.jl#L334-L338)Missing docstring.Missing docstring for `channels_route`. Check Documenter's build log for details.

`Genie.Assets.channels_script` — Function
```julia
channels_script(channel::AbstractString = Genie.config.webchannels_default_route) :: String
```
Outputs the channels JavaScript content within `<script>...</script>` tags, for embedding into the page.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Assets.jl#L344-L348)Missing docstring.Missing docstring for `channels_script_tag`. Check Documenter's build log for details.

`Genie.Assets.channels_subscribe` — Function
```julia
channels_subscribe(channel::AbstractString = Genie.config.webchannels_default_route) :: Nothing
```
Registers subscription and unsubscription channels for `channel`.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Assets.jl#L358-L362)[`Genie.Assets.channels_support`](#Genie.Assets.channels_support) — Function
```julia
channels_support(channel = Genie.config.webchannels_default_route) :: String
```
Provides full web channels support, setting up routes for loading support JS files, web sockets subscription and returning the `<script>` tag for including the linked JS file into the web page.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Assets.jl#L406-L411)[`Genie.Assets.css_asset`](#Genie.Assets.css_asset) — Function
```julia
css_asset(file_name::String) :: String
```
Path to a css asset. The `file_name` should not include the extension.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Assets.jl#L185-L189)[`Genie.Assets.embedded`](#Genie.Assets.embedded) — Function
```julia
embeded(path::String) :: String
```
Reads and outputs the file at `path`.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Assets.jl#L262-L266)[`Genie.Assets.embedded_path`](#Genie.Assets.embedded_path) — Function
```julia
embeded_path(path::String) :: String
```
Returns the path relative to Genie's root package dir.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Assets.jl#L272-L276)[`Genie.Assets.external_assets`](#Genie.Assets.external_assets) — Function
```julia
external_assets(host::String) :: Bool
external_assets(ac::AssetsConfig) :: Bool
external_assets() :: Bool
```
Returns true if the current package is using external assets.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Assets.jl#L76-L82)[`Genie.Assets.favicon_support`](#Genie.Assets.favicon_support) — Function
```julia
favicon_support() :: String
```
Outputs the `<link>` tag for referencing the favicon file embedded with Genie.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Assets.jl#L531-L535)[`Genie.Assets.include_asset`](#Genie.Assets.include_asset) — Function
```julia
include_asset(asset_type::Union{String,Symbol}, file_name::Union{String,Symbol}) :: String
```
Returns the path to an asset. `asset_type` can be one of `:js`, `:css`. The `file_name` should not include the extension.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Assets.jl#L175-L179)[`Genie.Assets.js_asset`](#Genie.Assets.js_asset) — Function
```julia
js_asset(file_name::String) :: String
```
Path to a js asset. `file_name` should not include the extension.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Assets.jl#L196-L200)Missing docstring.Missing docstring for `jsliteral`. Check Documenter's build log for details.

`Genie.Assets.js_settings` — Function
```julia
js_settings(channel::String = Genie.config.webchannels_default_route) :: String
```
Sets up a `window.Genie.Settings` JavaScript object which exposes relevant Genie app settings from `Genie.config`

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Assets.jl#L212-L216)[`Genie.Assets.webthreads`](#Genie.Assets.webthreads) — Function
```julia
webthreads() :: String
```
Outputs the webthreads.js file included with the Genie package

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Assets.jl#L422-L426)Missing docstring.Missing docstring for `webthreads_endpoint`. Check Documenter's build log for details.

`Genie.Assets.webthreads_push_pull` — Function
```julia
function webthreads_push_pull(channel) :: Nothing
```
Registers push and pull routes for `channel`.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Assets.jl#L471-L475)Missing docstring.Missing docstring for `webthreads_route`. Check Documenter's build log for details.

`Genie.Assets.webthreads_script` — Function
```julia
webthreads_script() :: String
```
Outputs the channels JavaScript content within `<script>...</script>` tags, for embedding into the page.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Assets.jl#L434-L438)Missing docstring.Missing docstring for `webthreads_script_tag`. Check Documenter's build log for details.

`Genie.Assets.webthreads_subscribe` — Function
```julia
function webthreads_subscribe(channel) :: Nothing
```
Registers subscription and unsubscription routes for `channel`.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Assets.jl#L448-L452)[`Genie.Assets.webthreads_support`](#Genie.Assets.webthreads_support) — Function
```julia
webthreads_support(channel = Genie.config.webthreads_default_route) :: String
```
Provides full web channels support, setting up routes for loading support JS files, web sockets subscription and returning the `<script>` tag for including the linked JS file into the web page.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Assets.jl#L514-L519)[« Deploying to server with Nginx](../tutorials/92--Deploying_Genie_Server_Apps_with_Nginx.html)[Commands »](commands.html)Powered by [Documenter.jl](https://github.com/JuliaDocs/Documenter.jl) and the [Julia Programming Language](https://julialang.org/).

Settings

Themedocumenter-lightdocumenter-dark



---

This document was generated with [Documenter.jl](https://github.com/JuliaDocs/Documenter.jl) version 0.27.25 on Sunday 27 August 2023. Using Julia version 1.9.3.



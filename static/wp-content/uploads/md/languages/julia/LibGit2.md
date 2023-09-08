The LibGit2 module provides bindings to [libgit2](https://libgit2.org/), a portable C library that implements core functionality for the [Git](https://git-scm.com/) version control system. These bindings are currently used to power Julia's package manager. It is expected that this module will eventually be moved into a separate package.

Some of this documentation assumes some prior knowledge of the libgit2 API. For more information on some of the objects and methods referenced here, consult the upstream [libgit2 API reference](https://libgit2.org/libgit2/#v0.25.1).


```julia
LibGit2.Buffer
```
A data buffer for exporting data from libgit2. Matches the [`git_buf`](https://libgit2.org/libgit2/#HEAD/type/git_buf) struct.

When fetching data from LibGit2, a typical usage would look like:


```julia
buf_ref = Ref(Buffer())
@check ccall(..., (Ptr{Buffer},), buf_ref)
# operation on buf_ref
free(buf_ref)
```
In particular, note that `LibGit2.free` should be called afterward on the `Ref` object.


```julia
LibGit2.CheckoutOptions
```
Matches the [`git_checkout_options`](https://libgit2.org/libgit2/#HEAD/type/git_checkout_options) struct.

The fields represent:

* `version`: version of the struct in use, in case this changes later. For now, always `1`.
* `checkout_strategy`: determine how to handle conflicts and whether to force the checkout/recreate missing files.
* `disable_filters`: if nonzero, do not apply filters like CLRF (to convert file newlines between UNIX and DOS).
* `dir_mode`: read/write/access mode for any directories involved in the checkout. Default is `0755`.
* `file_mode`: read/write/access mode for any files involved in the checkout. Default is `0755` or `0644`, depending on the blob.
* `file_open_flags`: bitflags used to open any files during the checkout.
* `notify_flags`: Flags for what sort of conflicts the user should be notified about.
* `notify_cb`: An optional callback function to notify the user if a checkout conflict occurs. If this function returns a non-zero value, the checkout will be cancelled.
* `notify_payload`: Payload for the notify callback function.
* `progress_cb`: An optional callback function to display checkout progress.
* `progress_payload`: Payload for the progress callback.
* `paths`: If not empty, describes which paths to search during the checkout. If empty, the checkout will occur over all files in the repository.
* `baseline`: Expected content of the [`workdir`](https://docs.julialang.org/#LibGit2.workdir), captured in a (pointer to a) [`GitTree`](https://docs.julialang.org/#LibGit2.GitTree). Defaults to the state of the tree at HEAD.
* `baseline_index`: Expected content of the [`workdir`](https://docs.julialang.org/#LibGit2.workdir), captured in a (pointer to a) `GitIndex`. Defaults to the state of the index at HEAD.
* `target_directory`: If not empty, checkout to this directory instead of the `workdir`.
* `ancestor_label`: In case of conflicts, the name of the common ancestor side.
* `our_label`: In case of conflicts, the name of "our" side.
* `their_label`: In case of conflicts, the name of "their" side.
* `perfdata_cb`: An optional callback function to display performance data.
* `perfdata_payload`: Payload for the performance callback.

```julia
LibGit2.CloneOptions
```
Matches the [`git_clone_options`](https://libgit2.org/libgit2/#HEAD/type/git_clone_options) struct.

The fields represent:

* `version`: version of the struct in use, in case this changes later. For now, always `1`.
* `checkout_opts`: The options for performing the checkout of the remote as part of the clone.
* `fetch_opts`: The options for performing the pre-checkout fetch of the remote as part of the clone.
* `bare`: If `0`, clone the full remote repository. If non-zero, perform a bare clone, in which there is no local copy of the source files in the repository and the [`gitdir`](https://docs.julialang.org/#LibGit2.gitdir) and [`workdir`](https://docs.julialang.org/#LibGit2.workdir) are the same.
* `localclone`: Flag whether to clone a local object database or do a fetch. The default is to let git decide. It will not use the git-aware transport for a local clone, but will use it for URLs which begin with `file://`.
* `checkout_branch`: The name of the branch to checkout. If an empty string, the default branch of the remote will be checked out.
* `repository_cb`: An optional callback which will be used to create the *new* repository into which the clone is made.
* `repository_cb_payload`: The payload for the repository callback.
* `remote_cb`: An optional callback used to create the [`GitRemote`](https://docs.julialang.org/#LibGit2.GitRemote) before making the clone from it.
* `remote_cb_payload`: The payload for the remote callback.

```julia
LibGit2.DescribeOptions
```
Matches the [`git_describe_options`](https://libgit2.org/libgit2/#HEAD/type/git_describe_options) struct.

The fields represent:

* `version`: version of the struct in use, in case this changes later. For now, always `1`.
* `max_candidates_tags`: consider this many most recent tags in `refs/tags` to describe a commit. Defaults to 10 (so that the 10 most recent tags would be examined to see if they describe a commit).
* `describe_strategy`: whether to consider all entries in `refs/tags` (equivalent to `git-describe --tags`) or all entries in `refs/` (equivalent to `git-describe --all`). The default is to only show annotated tags. If `Consts.DESCRIBE_TAGS` is passed, all tags, annotated or not, will be considered. If `Consts.DESCRIBE_ALL` is passed, any ref in `refs/` will be considered.
* `pattern`: only consider tags which match `pattern`. Supports glob expansion.
* `only_follow_first_parent`: when finding the distance from a matching reference to the described object, only consider the distance from the first parent.
* `show_commit_oid_as_fallback`: if no matching reference can be found which describes a commit, show the commit's [`GitHash`](https://docs.julialang.org/#LibGit2.GitHash) instead of throwing an error (the default behavior).

```julia
LibGit2.DescribeFormatOptions
```
Matches the [`git_describe_format_options`](https://libgit2.org/libgit2/#HEAD/type/git_describe_format_options) struct.

The fields represent:

* `version`: version of the struct in use, in case this changes later. For now, always `1`.
* `abbreviated_size`: lower bound on the size of the abbreviated `GitHash` to use, defaulting to `7`.
* `always_use_long_format`: set to `1` to use the long format for strings even if a short format can be used.
* `dirty_suffix`: if set, this will be appended to the end of the description string if the [`workdir`](https://docs.julialang.org/#LibGit2.workdir) is dirty.

```julia
LibGit2.DiffDelta
```
Description of changes to one entry. Matches the [`git_diff_delta`](https://libgit2.org/libgit2/#HEAD/type/git_diff_delta) struct.

The fields represent:

* `status`: One of `Consts.DELTA_STATUS`, indicating whether the file has been added/modified/deleted.
* `flags`: Flags for the delta and the objects on each side. Determines whether to treat the file(s) as binary/text, whether they exist on each side of the diff, and whether the object ids are known to be correct.
* `similarity`: Used to indicate if a file has been renamed or copied.
* `nfiles`: The number of files in the delta (for instance, if the delta was run on a submodule commit id, it may contain more than one file).
* `old_file`: A [`DiffFile`](https://docs.julialang.org/#LibGit2.DiffFile) containing information about the file(s) before the changes.
* `new_file`: A [`DiffFile`](https://docs.julialang.org/#LibGit2.DiffFile) containing information about the file(s) after the changes.

```julia
LibGit2.DiffFile
```
Description of one side of a delta. Matches the [`git_diff_file`](https://libgit2.org/libgit2/#HEAD/type/git_diff_file) struct.

The fields represent:

* `id`: the [`GitHash`](https://docs.julialang.org/#LibGit2.GitHash) of the item in the diff. If the item is empty on this side of the diff (for instance, if the diff is of the removal of a file), this will be `GitHash(0)`.
* `path`: a `NULL` terminated path to the item relative to the working directory of the repository.
* `size`: the size of the item in bytes.
* `flags`: a combination of the [`git_diff_flag_t`](https://libgit2.org/libgit2/#HEAD/type/git_diff_flag_t) flags. The `i`th bit of this integer sets the `i`th flag.
* `mode`: the [`stat`](https://docs.julialang.org/../../base/file/#Base.stat) mode for the item.
* `id_abbrev`: only present in LibGit2 versions newer than or equal to `0.25.0`. The length of the `id` field when converted using [`string`](https://docs.julialang.org/../../base/strings/#Base.string). Usually equal to `OID_HEXSZ` (40).

```julia
LibGit2.DiffOptionsStruct
```
Matches the [`git_diff_options`](https://libgit2.org/libgit2/#HEAD/type/git_diff_options) struct.

The fields represent:

* `version`: version of the struct in use, in case this changes later. For now, always `1`.
* `flags`: flags controlling which files will appear in the diff. Defaults to `DIFF_NORMAL`.
* `ignore_submodules`: whether to look at files in submodules or not. Defaults to `SUBMODULE_IGNORE_UNSPECIFIED`, which means the submodule's configuration will control whether it appears in the diff or not.
* `pathspec`: path to files to include in the diff. Default is to use all files in the repository.
* `notify_cb`: optional callback which will notify the user of changes to the diff as file deltas are added to it.
* `progress_cb`: optional callback which will display diff progress. Only relevant on libgit2 versions at least as new as 0.24.0.
* `payload`: the payload to pass to `notify_cb` and `progress_cb`.
* `context_lines`: the number of *unchanged* lines used to define the edges of a hunk. This is also the number of lines which will be shown before/after a hunk to provide context. Default is 3.
* `interhunk_lines`: the maximum number of *unchanged* lines *between* two separate hunks allowed before the hunks will be combined. Default is 0.
* `id_abbrev`: sets the length of the abbreviated [`GitHash`](https://docs.julialang.org/#LibGit2.GitHash) to print. Default is `7`.
* `max_size`: the maximum file size of a blob. Above this size, it will be treated as a binary blob. The default is 512 MB.
* `old_prefix`: the virtual file directory in which to place old files on one side of the diff. Default is `"a"`.
* `new_prefix`: the virtual file directory in which to place new files on one side of the diff. Default is `"b"`.

```julia
LibGit2.FetchHead
```
Contains the information about HEAD during a fetch, including the name and URL of the branch fetched from, the oid of the HEAD, and whether the fetched HEAD has been merged locally.

The fields represent:

* `name`: The name in the local reference database of the fetch head, for example, `"refs/heads/master"`.
* `url`: The URL of the fetch head.
* `oid`: The [`GitHash`](https://docs.julialang.org/#LibGit2.GitHash) of the tip of the fetch head.
* `ismerge`: Boolean flag indicating whether the changes at the remote have been merged into the local copy yet or not. If `true`, the local copy is up to date with the remote fetch head.

```julia
LibGit2.FetchOptions
```
Matches the [`git_fetch_options`](https://libgit2.org/libgit2/#HEAD/type/git_fetch_options) struct.

The fields represent:

* `version`: version of the struct in use, in case this changes later. For now, always `1`.
* `callbacks`: remote callbacks to use during the fetch.
* `prune`: whether to perform a prune after the fetch or not. The default is to use the setting from the `GitConfig`.
* `update_fetchhead`: whether to update the [`FetchHead`](https://docs.julialang.org/#LibGit2.FetchHead) after the fetch. The default is to perform the update, which is the normal git behavior.
* `download_tags`: whether to download tags present at the remote or not. The default is to request the tags for objects which are being downloaded anyway from the server.
* `proxy_opts`: options for connecting to the remote through a proxy. See [`ProxyOptions`](https://docs.julialang.org/#LibGit2.ProxyOptions). Only present on libgit2 versions newer than or equal to 0.25.0.
* `custom_headers`: any extra headers needed for the fetch. Only present on libgit2 versions newer than or equal to 0.24.0.

```julia
GitAnnotated(repo::GitRepo, commit_id::GitHash)
GitAnnotated(repo::GitRepo, ref::GitReference)
GitAnnotated(repo::GitRepo, fh::FetchHead)
GitAnnotated(repo::GitRepo, committish::AbstractString)
```
An annotated git commit carries with it information about how it was looked up and why, so that rebase or merge operations have more information about the context of the commit. Conflict files contain information about the source/target branches in the merge which are conflicting, for instance. An annotated commit can refer to the tip of a remote branch, for instance when a [`FetchHead`](https://docs.julialang.org/#LibGit2.FetchHead) is passed, or to a branch head described using `GitReference`.


```julia
GitBlame(repo::GitRepo, path::AbstractString; options::BlameOptions=BlameOptions())
```
Construct a `GitBlame` object for the file at `path`, using change information gleaned from the history of `repo`. The `GitBlame` object records who changed which chunks of the file when, and how. `options` controls how to separate the contents of the file and which commits to probe - see [`BlameOptions`](https://docs.julialang.org/#LibGit2.BlameOptions) for more information.


```julia
GitBlob(repo::GitRepo, hash::AbstractGitHash)
GitBlob(repo::GitRepo, spec::AbstractString)
```
Return a `GitBlob` object from `repo` specified by `hash`/`spec`.

* `hash` is a full (`GitHash`) or partial (`GitShortHash`) hash.
* `spec` is a textual specification: see [the git docs](https://git-scm.com/docs/git-rev-parse.html#_specifying_revisions) for a full list.

```julia
GitCommit(repo::GitRepo, hash::AbstractGitHash)
GitCommit(repo::GitRepo, spec::AbstractString)
```
Return a `GitCommit` object from `repo` specified by `hash`/`spec`.

* `hash` is a full (`GitHash`) or partial (`GitShortHash`) hash.
* `spec` is a textual specification: see [the git docs](https://git-scm.com/docs/git-rev-parse.html#_specifying_revisions) for a full list.

```julia
GitHash
```
A git object identifier, based on the sha-1 hash. It is a 20 byte string (40 hex digits) used to identify a `GitObject` in a repository.


```julia
GitObject(repo::GitRepo, hash::AbstractGitHash)
GitObject(repo::GitRepo, spec::AbstractString)
```
Return the specified object ([`GitCommit`](https://docs.julialang.org/#LibGit2.GitCommit), [`GitBlob`](https://docs.julialang.org/#LibGit2.GitBlob), [`GitTree`](https://docs.julialang.org/#LibGit2.GitTree) or [`GitTag`](https://docs.julialang.org/#LibGit2.GitTag)) from `repo` specified by `hash`/`spec`.

* `hash` is a full (`GitHash`) or partial (`GitShortHash`) hash.
* `spec` is a textual specification: see [the git docs](https://git-scm.com/docs/git-rev-parse.html#_specifying_revisions) for a full list.

```julia
GitRemote(repo::GitRepo, rmt_name::AbstractString, rmt_url::AbstractString) -> GitRemote
```
Look up a remote git repository using its name and URL. Uses the default fetch refspec.

**Examples**


```julia
repo = LibGit2.init(repo_path)
remote = LibGit2.GitRemote(repo, "upstream", repo_url)
```

```julia
GitRemote(repo::GitRepo, rmt_name::AbstractString, rmt_url::AbstractString, fetch_spec::AbstractString) -> GitRemote
```
Look up a remote git repository using the repository's name and URL, as well as specifications for how to fetch from the remote (e.g. which remote branch to fetch from).

**Examples**


```julia
repo = LibGit2.init(repo_path)
refspec = "+refs/heads/mybranch:refs/remotes/origin/mybranch"
remote = LibGit2.GitRemote(repo, "upstream", repo_url, refspec)
```

```julia
GitRemoteAnon(repo::GitRepo, url::AbstractString) -> GitRemote
```
Look up a remote git repository using only its URL, not its name.

**Examples**


```julia
repo = LibGit2.init(repo_path)
remote = LibGit2.GitRemoteAnon(repo, repo_url)
```

```julia
LibGit2.GitRepo(path::AbstractString)
```
Open a git repository at `path`.


```julia
LibGit2.GitRepoExt(path::AbstractString, flags::Cuint = Cuint(Consts.REPOSITORY_OPEN_DEFAULT))
```
Open a git repository at `path` with extended controls (for instance, if the current user must be a member of a special access group to read `path`).


```julia
GitRevWalker(repo::GitRepo)
```
A `GitRevWalker` *walks* through the *revisions* (i.e. commits) of a git repository `repo`. It is a collection of the commits in the repository, and supports iteration and calls to [`LibGit2.map`](https://docs.julialang.org/#LibGit2.map) and [`LibGit2.count`](https://docs.julialang.org/#LibGit2.count) (for instance, `LibGit2.count` could be used to determine what percentage of commits in a repository were made by a certain author).


```julia
cnt = LibGit2.with(LibGit2.GitRevWalker(repo)) do walker
    LibGit2.count((oid,repo)->(oid == commit_oid1), walker, oid=commit_oid1, by=LibGit2.Consts.SORT_TIME)
end
```
Here, `LibGit2.count` finds the number of commits along the walk with a certain `GitHash`. Since the `GitHash` is unique to a commit, `cnt` will be `1`.


```julia
GitShortHash(hash::GitHash, len::Integer)
```
A shortened git object identifier, which can be used to identify a git object when it is unique, consisting of the initial `len` hexadecimal digits of `hash` (the remaining digits are ignored).


```julia
LibGit2.GitSignature
```
This is a Julia wrapper around a pointer to a [`git_signature`](https://libgit2.org/libgit2/#HEAD/type/git_signature) object.


```julia
LibGit2.GitStatus(repo::GitRepo; status_opts=StatusOptions())
```
Collect information about the status of each file in the git repository `repo` (e.g. is the file modified, staged, etc.). `status_opts` can be used to set various options, for instance whether or not to look at untracked files or whether to include submodules or not. See [`StatusOptions`](https://docs.julialang.org/#LibGit2.StatusOptions) for more information.


```julia
GitTag(repo::GitRepo, hash::AbstractGitHash)
GitTag(repo::GitRepo, spec::AbstractString)
```
Return a `GitTag` object from `repo` specified by `hash`/`spec`.

* `hash` is a full (`GitHash`) or partial (`GitShortHash`) hash.
* `spec` is a textual specification: see [the git docs](https://git-scm.com/docs/git-rev-parse.html#_specifying_revisions) for a full list.

```julia
GitTree(repo::GitRepo, hash::AbstractGitHash)
GitTree(repo::GitRepo, spec::AbstractString)
```
Return a `GitTree` object from `repo` specified by `hash`/`spec`.

* `hash` is a full (`GitHash`) or partial (`GitShortHash`) hash.
* `spec` is a textual specification: see [the git docs](https://git-scm.com/docs/git-rev-parse.html#_specifying_revisions) for a full list.

```julia
LibGit2.IndexEntry
```
In-memory representation of a file entry in the index. Matches the [`git_index_entry`](https://libgit2.org/libgit2/#HEAD/type/git_index_entry) struct.


```julia
LibGit2.BlameOptions
```
Matches the [`git_blame_options`](https://libgit2.org/libgit2/#HEAD/type/git_blame_options) struct.

The fields represent:

* `version`: version of the struct in use, in case this changes later. For now, always `1`.
* `flags`: one of `Consts.BLAME_NORMAL` or `Consts.BLAME_FIRST_PARENT` (the other blame flags are not yet implemented by libgit2).
* `min_match_characters`: the minimum number of *alphanumeric* characters which much change in a commit in order for the change to be associated with that commit. The default is 20. Only takes effect if one of the `Consts.BLAME_*_COPIES` flags are used, which libgit2 does not implement yet.
* `newest_commit`: the [`GitHash`](https://docs.julialang.org/#LibGit2.GitHash) of the newest commit from which to look at changes.
* `oldest_commit`: the [`GitHash`](https://docs.julialang.org/#LibGit2.GitHash) of the oldest commit from which to look at changes.
* `min_line`: the first line of the file from which to starting blaming. The default is `1`.
* `max_line`: the last line of the file to which to blame. The default is `0`, meaning the last line of the file.

```julia
LibGit2.MergeOptions
```
Matches the [`git_merge_options`](https://libgit2.org/libgit2/#HEAD/type/git_merge_options) struct.

The fields represent:

* `version`: version of the struct in use, in case this changes later. For now, always `1`.
* `flags`: an `enum` for flags describing merge behavior. Defined in [`git_merge_flag_t`](https://github.com/libgit2/libgit2/blob/HEAD/include/git2/merge.h#L95). The corresponding Julia enum is `GIT_MERGE` and has values:
	+ `MERGE_FIND_RENAMES`: detect if a file has been renamed between the common ancestor and the "ours" or "theirs" side of the merge. Allows merges where a file has been renamed.
	+ `MERGE_FAIL_ON_CONFLICT`: exit immediately if a conflict is found rather than trying to resolve it.
	+ `MERGE_SKIP_REUC`: do not write the REUC extension on the index resulting from the merge.
	+ `MERGE_NO_RECURSIVE`: if the commits being merged have multiple merge bases, use the first one, rather than trying to recursively merge the bases.
* `rename_threshold`: how similar two files must to consider one a rename of the other. This is an integer that sets the percentage similarity. The default is 50.
* `target_limit`: the maximum number of files to compare with to look for renames. The default is 200.
* `metric`: optional custom function to use to determine the similarity between two files for rename detection.
* `recursion_limit`: the upper limit on the number of merges of common ancestors to perform to try to build a new virtual merge base for the merge. The default is no limit. This field is only present on libgit2 versions newer than 0.24.0.
* `default_driver`: the merge driver to use if both sides have changed. This field is only present on libgit2 versions newer than 0.25.0.
* `file_favor`: how to handle conflicting file contents for the `text` driver.
	+ `MERGE_FILE_FAVOR_NORMAL`: if both sides of the merge have changes to a section, make a note of the conflict in the index which `git checkout` will use to create a merge file, which the user can then reference to resolve the conflicts. This is the default.
	+ `MERGE_FILE_FAVOR_OURS`: if both sides of the merge have changes to a section, use the version in the "ours" side of the merge in the index.
	+ `MERGE_FILE_FAVOR_THEIRS`: if both sides of the merge have changes to a section, use the version in the "theirs" side of the merge in the index.
	+ `MERGE_FILE_FAVOR_UNION`: if both sides of the merge have changes to a section, include each unique line from both sides in the file which is put into the index.
* `file_flags`: guidelines for merging files.

```julia
LibGit2.ProxyOptions
```
Options for connecting through a proxy.

Matches the [`git_proxy_options`](https://libgit2.org/libgit2/#HEAD/type/git_proxy_options) struct.

The fields represent:

* `version`: version of the struct in use, in case this changes later. For now, always `1`.
* `proxytype`: an `enum` for the type of proxy to use. Defined in [`git_proxy_t`](https://libgit2.org/libgit2/#HEAD/type/git_proxy_t). The corresponding Julia enum is `GIT_PROXY` and has values:
	+ `PROXY_NONE`: do not attempt the connection through a proxy.
	+ `PROXY_AUTO`: attempt to figure out the proxy configuration from the git configuration.
	+ `PROXY_SPECIFIED`: connect using the URL given in the `url` field of this struct.Default is to auto-detect the proxy type.
* `url`: the URL of the proxy.
* `credential_cb`: a pointer to a callback function which will be called if the remote requires authentication to connect.
* `certificate_cb`: a pointer to a callback function which will be called if certificate verification fails. This lets the user decide whether or not to keep connecting. If the function returns `1`, connecting will be allowed. If it returns `0`, the connection will not be allowed. A negative value can be used to return errors.
* `payload`: the payload to be provided to the two callback functions.

**Examples**


```julia
julia> fo = LibGit2.FetchOptions(
           proxy_opts = LibGit2.ProxyOptions(url = Cstring("https://my_proxy_url.com")))

julia> fetch(remote, "master", options=fo)
```

```julia
LibGit2.PushOptions
```
Matches the [`git_push_options`](https://libgit2.org/libgit2/#HEAD/type/git_push_options) struct.

The fields represent:

* `version`: version of the struct in use, in case this changes later. For now, always `1`.
* `parallelism`: if a pack file must be created, this variable sets the number of worker threads which will be spawned by the packbuilder. If `0`, the packbuilder will auto-set the number of threads to use. The default is `1`.
* `callbacks`: the callbacks (e.g. for authentication with the remote) to use for the push.
* `proxy_opts`: only relevant if the LibGit2 version is greater than or equal to `0.25.0`. Sets options for using a proxy to communicate with a remote. See [`ProxyOptions`](https://docs.julialang.org/#LibGit2.ProxyOptions) for more information.
* `custom_headers`: only relevant if the LibGit2 version is greater than or equal to `0.24.0`. Extra headers needed for the push operation.

```julia
LibGit2.RebaseOperation
```
Describes a single instruction/operation to be performed during the rebase. Matches the [`git_rebase_operation`](https://libgit2.org/libgit2/#HEAD/type/git_rebase_operation_t) struct.

The fields represent:

* `optype`: the type of rebase operation currently being performed. The options are:
	+ `REBASE_OPERATION_PICK`: cherry-pick the commit in question.
	+ `REBASE_OPERATION_REWORD`: cherry-pick the commit in question, but rewrite its message using the prompt.
	+ `REBASE_OPERATION_EDIT`: cherry-pick the commit in question, but allow the user to edit the commit's contents and its message.
	+ `REBASE_OPERATION_SQUASH`: squash the commit in question into the previous commit. The commit messages of the two commits will be merged.
	+ `REBASE_OPERATION_FIXUP`: squash the commit in question into the previous commit. Only the commit message of the previous commit will be used.
	+ `REBASE_OPERATION_EXEC`: do not cherry-pick a commit. Run a command and continue if the command exits successfully.
* `id`: the [`GitHash`](https://docs.julialang.org/#LibGit2.GitHash) of the commit being worked on during this rebase step.
* `exec`: in case `REBASE_OPERATION_EXEC` is used, the command to run during this step (for instance, running the test suite after each commit).

```julia
LibGit2.RebaseOptions
```
Matches the `git_rebase_options` struct.

The fields represent:

* `version`: version of the struct in use, in case this changes later. For now, always `1`.
* `quiet`: inform other git clients helping with/working on the rebase that the rebase should be done "quietly". Used for interoperability. The default is `1`.
* `inmemory`: start an in-memory rebase. Callers working on the rebase can go through its steps and commit any changes, but cannot rewind HEAD or update the repository. The [`workdir`](https://docs.julialang.org/#LibGit2.workdir) will not be modified. Only present on libgit2 versions newer than or equal to 0.24.0.
* `rewrite_notes_ref`: name of the reference to notes to use to rewrite the commit notes as the rebase is finished.
* `merge_opts`: merge options controlling how the trees will be merged at each rebase step. Only present on libgit2 versions newer than or equal to 0.24.0.
* `checkout_opts`: checkout options for writing files when initializing the rebase, stepping through it, and aborting it. See [`CheckoutOptions`](https://docs.julialang.org/#LibGit2.CheckoutOptions) for more information.

```julia
LibGit2.SignatureStruct
```
An action signature (e.g. for committers, taggers, etc). Matches the [`git_signature`](https://libgit2.org/libgit2/#HEAD/type/git_signature) struct.

The fields represent:

* `name`: The full name of the committer or author of the commit.
* `email`: The email at which the committer/author can be contacted.
* `when`: a [`TimeStruct`](https://docs.julialang.org/#LibGit2.TimeStruct) indicating when the commit was authored/committed into the repository.

```julia
LibGit2.StatusEntry
```
Providing the differences between the file as it exists in HEAD and the index, and providing the differences between the index and the working directory. Matches the `git_status_entry` struct.

The fields represent:

* `status`: contains the status flags for the file, indicating if it is current, or has been changed in some way in the index or work tree.
* `head_to_index`: a pointer to a [`DiffDelta`](https://docs.julialang.org/#LibGit2.DiffDelta) which encapsulates the difference(s) between the file as it exists in HEAD and in the index.
* `index_to_workdir`: a pointer to a `DiffDelta` which encapsulates the difference(s) between the file as it exists in the index and in the [`workdir`](https://docs.julialang.org/#LibGit2.workdir).

```julia
LibGit2.StatusOptions
```
Options to control how `git_status_foreach_ext()` will issue callbacks. Matches the [`git_status_opt_t`](https://libgit2.org/libgit2/#HEAD/type/git_status_opt_t) struct.

The fields represent:

* `version`: version of the struct in use, in case this changes later. For now, always `1`.
* `show`: a flag for which files to examine and in which order. The default is `Consts.STATUS_SHOW_INDEX_AND_WORKDIR`.
* `flags`: flags for controlling any callbacks used in a status call.
* `pathspec`: an array of paths to use for path-matching. The behavior of the path-matching will vary depending on the values of `show` and `flags`.
* The `baseline` is the tree to be used for comparison to the working directory and index; defaults to HEAD.

```julia
LibGit2.StrArrayStruct
```
A LibGit2 representation of an array of strings. Matches the [`git_strarray`](https://libgit2.org/libgit2/#HEAD/type/git_strarray) struct.

When fetching data from LibGit2, a typical usage would look like:


```julia
sa_ref = Ref(StrArrayStruct())
@check ccall(..., (Ptr{StrArrayStruct},), sa_ref)
res = convert(Vector{String}, sa_ref[])
free(sa_ref)
```
In particular, note that `LibGit2.free` should be called afterward on the `Ref` object.

Conversely, when passing a vector of strings to LibGit2, it is generally simplest to rely on implicit conversion:


```julia
strs = String[...]
@check ccall(..., (Ptr{StrArrayStruct},), strs)
```
Note that no call to `free` is required as the data is allocated by Julia.


```julia
LibGit2.TimeStruct
```
Time in a signature. Matches the [`git_time`](https://libgit2.org/libgit2/#HEAD/type/git_time) struct.


```julia
add!(repo::GitRepo, files::AbstractString...; flags::Cuint = Consts.INDEX_ADD_DEFAULT)
add!(idx::GitIndex, files::AbstractString...; flags::Cuint = Consts.INDEX_ADD_DEFAULT)
```
Add all the files with paths specified by `files` to the index `idx` (or the index of the `repo`). If the file already exists, the index entry will be updated. If the file does not exist already, it will be newly added into the index. `files` may contain glob patterns which will be expanded and any matching files will be added (unless `INDEX_ADD_DISABLE_PATHSPEC_MATCH` is set, see below). If a file has been ignored (in `.gitignore` or in the config), it *will not* be added, *unless* it is already being tracked in the index, in which case it *will* be updated. The keyword argument `flags` is a set of bit-flags which control the behavior with respect to ignored files:

* `Consts.INDEX_ADD_DEFAULT` - default, described above.
* `Consts.INDEX_ADD_FORCE` - disregard the existing ignore rules and force addition of the file to the index even if it is already ignored.
* `Consts.INDEX_ADD_CHECK_PATHSPEC` - cannot be used at the same time as `INDEX_ADD_FORCE`. Check that each file in `files` which exists on disk is not in the ignore list. If one of the files *is* ignored, the function will return `EINVALIDSPEC`.
* `Consts.INDEX_ADD_DISABLE_PATHSPEC_MATCH` - turn off glob matching, and only add files to the index which exactly match the paths specified in `files`.

```julia
add_fetch!(repo::GitRepo, rmt::GitRemote, fetch_spec::String)
```
Add a *fetch* refspec for the specified `rmt`. This refspec will contain information about which branch(es) to fetch from.

**Examples**


```julia
julia> LibGit2.add_fetch!(repo, remote, "upstream");

julia> LibGit2.fetch_refspecs(remote)
String["+refs/heads/*:refs/remotes/upstream/*"]
```

```julia
add_push!(repo::GitRepo, rmt::GitRemote, push_spec::String)
```
Add a *push* refspec for the specified `rmt`. This refspec will contain information about which branch(es) to push to.

**Examples**


```julia
julia> LibGit2.add_push!(repo, remote, "refs/heads/master");

julia> remote = LibGit2.get(LibGit2.GitRemote, repo, branch);

julia> LibGit2.push_refspecs(remote)
String["refs/heads/master"]
```
You may need to [`close`](https://docs.julialang.org/../../base/io-network/#Base.close) and reopen the `GitRemote` in question after updating its push refspecs in order for the change to take effect and for calls to [`push`](https://docs.julialang.org/#LibGit2.push) to work.


```julia
LibGit2.addblob!(repo::GitRepo, path::AbstractString)
```
Read the file at `path` and adds it to the object database of `repo` as a loose blob. Return the [`GitHash`](https://docs.julialang.org/#LibGit2.GitHash) of the resulting blob.

**Examples**


```julia
hash_str = string(commit_oid)
blob_file = joinpath(repo_path, ".git", "objects", hash_str[1:2], hash_str[3:end])
id = LibGit2.addblob!(repo, blob_file)
```

```julia
author(c::GitCommit)
```
Return the `Signature` of the author of the commit `c`. The author is the person who made changes to the relevant file(s). See also [`committer`](https://docs.julialang.org/#LibGit2.committer).


```julia
authors(repo::GitRepo) -> Vector{Signature}
```
Return all authors of commits to the `repo` repository.

**Examples**


```julia
repo = LibGit2.GitRepo(repo_path)
repo_file = open(joinpath(repo_path, test_file), "a")

println(repo_file, commit_msg)
flush(repo_file)
LibGit2.add!(repo, test_file)
sig = LibGit2.Signature("TEST", "TEST@TEST.COM", round(time(), 0), 0)
commit_oid1 = LibGit2.commit(repo, "commit1"; author=sig, committer=sig)
println(repo_file, randstring(10))
flush(repo_file)
LibGit2.add!(repo, test_file)
commit_oid2 = LibGit2.commit(repo, "commit2"; author=sig, committer=sig)

# will be a Vector of [sig, sig]
auths = LibGit2.authors(repo)
```

```julia
branch(repo::GitRepo)
```
Equivalent to `git branch`. Create a new branch from the current HEAD.


```julia
branch!(repo::GitRepo, branch_name::AbstractString, commit::AbstractString=""; kwargs...)
```
Checkout a new git branch in the `repo` repository. `commit` is the [`GitHash`](https://docs.julialang.org/#LibGit2.GitHash), in string form, which will be the start of the new branch. If `commit` is an empty string, the current HEAD will be used.

The keyword arguments are:

* `track::AbstractString=""`: the name of the remote branch this new branch should track, if any. If empty (the default), no remote branch will be tracked.
* `force::Bool=false`: if `true`, branch creation will be forced.
* `set_head::Bool=true`: if `true`, after the branch creation finishes the branch head will be set as the HEAD of `repo`.

Equivalent to `git checkout [-b|-B] <branch_name> [<commit>] [--track <track>]`.

**Examples**


```julia
repo = LibGit2.GitRepo(repo_path)
LibGit2.branch!(repo, "new_branch", set_head=false)
```

```julia
checkout!(repo::GitRepo, commit::AbstractString=""; force::Bool=true)
```
Equivalent to `git checkout [-f] --detach <commit>`. Checkout the git commit `commit` (a [`GitHash`](https://docs.julialang.org/#LibGit2.GitHash) in string form) in `repo`. If `force` is `true`, force the checkout and discard any current changes. Note that this detaches the current HEAD.

**Examples**


```julia
repo = LibGit2.init(repo_path)
open(joinpath(LibGit2.path(repo), "file1"), "w") do f
    write(f, "111
")
end
LibGit2.add!(repo, "file1")
commit_oid = LibGit2.commit(repo, "add file1")
open(joinpath(LibGit2.path(repo), "file1"), "w") do f
    write(f, "112
")
end
# would fail without the force=true
# since there are modifications to the file
LibGit2.checkout!(repo, string(commit_oid), force=true)
```

```julia
clone(repo_url::AbstractString, repo_path::AbstractString, clone_opts::CloneOptions)
```
Clone the remote repository at `repo_url` (which can be a remote URL or a path on the local filesystem) to `repo_path` (which must be a path on the local filesystem). Options for the clone, such as whether to perform a bare clone or not, are set by [`CloneOptions`](https://docs.julialang.org/#LibGit2.CloneOptions).

**Examples**


```julia
repo_url = "https://github.com/JuliaLang/Example.jl"
repo = LibGit2.clone(repo_url, "/home/me/projects/Example")
```

```julia
clone(repo_url::AbstractString, repo_path::AbstractString; kwargs...)
```
Clone a remote repository located at `repo_url` to the local filesystem location `repo_path`.

The keyword arguments are:

* `branch::AbstractString=""`: which branch of the remote to clone, if not the default repository branch (usually `master`).
* `isbare::Bool=false`: if `true`, clone the remote as a bare repository, which will make `repo_path` itself the git directory instead of `repo_path/.git`. This means that a working tree cannot be checked out. Plays the role of the git CLI argument `--bare`.
* `remote_cb::Ptr{Cvoid}=C_NULL`: a callback which will be used to create the remote before it is cloned. If `C_NULL` (the default), no attempt will be made to create the remote - it will be assumed to already exist.
* `credentials::Creds=nothing`: provides credentials and/or settings when authenticating against a private repository.
* `callbacks::Callbacks=Callbacks()`: user provided callbacks and payloads.

Equivalent to `git clone [-b <branch>] [--bare] <repo_url> <repo_path>`.

**Examples**


```julia
repo_url = "https://github.com/JuliaLang/Example.jl"
repo1 = LibGit2.clone(repo_url, "test_path")
repo2 = LibGit2.clone(repo_url, "test_path", isbare=true)
julia_url = "https://github.com/JuliaLang/julia"
julia_repo = LibGit2.clone(julia_url, "julia_path", branch="release-0.6")
```

```julia
commit(repo::GitRepo, msg::AbstractString; kwargs...) -> GitHash
```
Wrapper around [`git_commit_create`](https://libgit2.org/libgit2/#HEAD/group/commit/git_commit_create). Create a commit in the repository `repo`. `msg` is the commit message. Return the OID of the new commit.

The keyword arguments are:

* `refname::AbstractString=Consts.HEAD_FILE`: if not NULL, the name of the reference to update to point to the new commit. For example, `"HEAD"` will update the HEAD of the current branch. If the reference does not yet exist, it will be created.
* `author::Signature = Signature(repo)` is a `Signature` containing information about the person who authored the commit.
* `committer::Signature = Signature(repo)` is a `Signature` containing information about the person who committed the commit to the repository. Not necessarily the same as `author`, for instance if `author` emailed a patch to `committer` who committed it.
* `tree_id::GitHash = GitHash()` is a git tree to use to create the commit, showing its ancestry and relationship with any other history. `tree` must belong to `repo`.
* `parent_ids::Vector{GitHash}=GitHash[]` is a list of commits by [`GitHash`](https://docs.julialang.org/#LibGit2.GitHash) to use as parent commits for the new one, and may be empty. A commit might have multiple parents if it is a merge commit, for example.

```julia
LibGit2.commit(rb::GitRebase, sig::GitSignature)
```
Commit the current patch to the rebase `rb`, using `sig` as the committer. Is silent if the commit has already been applied.


```julia
committer(c::GitCommit)
```
Return the `Signature` of the committer of the commit `c`. The committer is the person who committed the changes originally authored by the [`author`](https://docs.julialang.org/#LibGit2.author), but need not be the same as the `author`, for example, if the `author` emailed a patch to a `committer` who committed it.


```julia
LibGit2.count(f::Function, walker::GitRevWalker; oid::GitHash=GitHash(), by::Cint=Consts.SORT_NONE, rev::Bool=false)
```
Using the [`GitRevWalker`](https://docs.julialang.org/#LibGit2.GitRevWalker) `walker` to "walk" over every commit in the repository's history, find the number of commits which return `true` when `f` is applied to them. The keyword arguments are: * `oid`: The [`GitHash`](https://docs.julialang.org/#LibGit2.GitHash) of the commit to begin the walk from. The default is to use [`push_head!`](https://docs.julialang.org/#LibGit2.push_head!) and therefore the HEAD commit and all its ancestors. * `by`: The sorting method. The default is not to sort. Other options are to sort by topology (`LibGit2.Consts.SORT_TOPOLOGICAL`), to sort forwards in time (`LibGit2.Consts.SORT_TIME`, most ancient first) or to sort backwards in time (`LibGit2.Consts.SORT_REVERSE`, most recent first). * `rev`: Whether to reverse the sorted order (for instance, if topological sorting is used).

**Examples**


```julia
cnt = LibGit2.with(LibGit2.GitRevWalker(repo)) do walker
    LibGit2.count((oid, repo)->(oid == commit_oid1), walker, oid=commit_oid1, by=LibGit2.Consts.SORT_TIME)
end
```
`LibGit2.count` finds the number of commits along the walk with a certain `GitHash` `commit_oid1`, starting the walk from that commit and moving forwards in time from it. Since the `GitHash` is unique to a commit, `cnt` will be `1`.


```julia
counthunks(blame::GitBlame)
```
Return the number of distinct "hunks" with a file. A hunk may contain multiple lines. A hunk is usually a piece of a file that was added/changed/removed together, for example, a function added to a source file or an inner loop that was optimized out of that function later.


```julia
LibGit2.create_branch(repo::GitRepo, bname::AbstractString, commit_obj::GitCommit; force::Bool=false)
```
Create a new branch in the repository `repo` with name `bname`, which points to commit `commit_obj` (which has to be part of `repo`). If `force` is `true`, overwrite an existing branch named `bname` if it exists. If `force` is `false` and a branch already exists named `bname`, this function will throw an error.


```julia
credential_callback(...) -> Cint
```
A LibGit2 credential callback function which provides different credential acquisition functionality w.r.t. a connection protocol. The `payload_ptr` is required to contain a `LibGit2.CredentialPayload` object which will keep track of state and settings.

The `allowed_types` contains a bitmask of `LibGit2.Consts.GIT_CREDTYPE` values specifying which authentication methods should be attempted.

Credential authentication is done in the following order (if supported):

* SSH agent
* SSH private/public key pair
* Username/password plain text

If a user is presented with a credential prompt they can abort the prompt by typing `^D` (pressing the control key together with the `d` key).

**Note**: Due to the specifics of the `libgit2` authentication procedure, when authentication fails, this function is called again without any indication whether authentication was successful or not. To avoid an infinite loop from repeatedly using the same faulty credentials, we will keep track of state using the payload.

For addition details see the LibGit2 guide on [authenticating against a server](https://libgit2.org/docs/guides/authentication/).

C function pointer for `credentials_callback`

Return signature object. Free it after use.


```julia
LibGit2.delete_branch(branch::GitReference)
```
Delete the branch pointed to by `branch`.


```julia
diff_files(repo::GitRepo, branch1::AbstractString, branch2::AbstractString; kwarg...) -> Vector{AbstractString}
```
Show which files have changed in the git repository `repo` between branches `branch1` and `branch2`.

The keyword argument is:

* `filter::Set{Consts.DELTA_STATUS}=Set([Consts.DELTA_ADDED, Consts.DELTA_MODIFIED, Consts.DELTA_DELETED]))`, and it sets options for the diff. The default is to show files added, modified, or deleted.

Return only the *names* of the files which have changed, *not* their contents.

**Examples**


```julia
LibGit2.branch!(repo, "branch/a")
LibGit2.branch!(repo, "branch/b")
# add a file to repo
open(joinpath(LibGit2.path(repo),"file"),"w") do f
    write(f, "hello repo
")
end
LibGit2.add!(repo, "file")
LibGit2.commit(repo, "add file")
# returns ["file"]
filt = Set([LibGit2.Consts.DELTA_ADDED])
files = LibGit2.diff_files(repo, "branch/a", "branch/b", filter=filt)
# returns [] because existing files weren't modified
filt = Set([LibGit2.Consts.DELTA_MODIFIED])
files = LibGit2.diff_files(repo, "branch/a", "branch/b", filter=filt)
```
Equivalent to `git diff --name-only --diff-filter=<filter> <branch1> <branch2>`.


```julia
entryid(te::GitTreeEntry)
```
Return the [`GitHash`](https://docs.julialang.org/#LibGit2.GitHash) of the object to which `te` refers.


```julia
entrytype(te::GitTreeEntry)
```
Return the type of the object to which `te` refers. The result will be one of the types which [`objtype`](https://docs.julialang.org/#LibGit2.objtype) returns, e.g. a `GitTree` or `GitBlob`.


```julia
fetch(rmt::GitRemote, refspecs; options::FetchOptions=FetchOptions(), msg="")
```
Fetch from the specified `rmt` remote git repository, using `refspecs` to determine which remote branch(es) to fetch. The keyword arguments are:

* `options`: determines the options for the fetch, e.g. whether to prune afterwards. See [`FetchOptions`](https://docs.julialang.org/#LibGit2.FetchOptions) for more information.
* `msg`: a message to insert into the reflogs.

```julia
fetch(repo::GitRepo; kwargs...)
```
Fetches updates from an upstream of the repository `repo`.

The keyword arguments are:

* `remote::AbstractString="origin"`: which remote, specified by name, of `repo` to fetch from. If this is empty, the URL will be used to construct an anonymous remote.
* `remoteurl::AbstractString=""`: the URL of `remote`. If not specified, will be assumed based on the given name of `remote`.
* `refspecs=AbstractString[]`: determines properties of the fetch.
* `credentials=nothing`: provides credentials and/or settings when authenticating against a private `remote`.
* `callbacks=Callbacks()`: user provided callbacks and payloads.

Equivalent to `git fetch [<remoteurl>|<repo>] [<refspecs>]`.


```julia
fetchheads(repo::GitRepo) -> Vector{FetchHead}
```
Return the list of all the fetch heads for `repo`, each represented as a [`FetchHead`](https://docs.julialang.org/#LibGit2.FetchHead), including their names, URLs, and merge statuses.

**Examples**


```julia
julia> fetch_heads = LibGit2.fetchheads(repo);

julia> fetch_heads[1].name
"refs/heads/master"

julia> fetch_heads[1].ismerge
true

julia> fetch_heads[2].name
"refs/heads/test_branch"

julia> fetch_heads[2].ismerge
false
```

```julia
fetch_refspecs(rmt::GitRemote) -> Vector{String}
```
Get the *fetch* refspecs for the specified `rmt`. These refspecs contain information about which branch(es) to fetch from.

**Examples**


```julia
julia> remote = LibGit2.get(LibGit2.GitRemote, repo, "upstream");

julia> LibGit2.add_fetch!(repo, remote, "upstream");

julia> LibGit2.fetch_refspecs(remote)
String["+refs/heads/*:refs/remotes/upstream/*"]
```
C function pointer for `fetchhead_foreach_callback`


```julia
merge_base(repo::GitRepo, one::AbstractString, two::AbstractString) -> GitHash
```
Find a merge base (a common ancestor) between the commits `one` and `two`. `one` and `two` may both be in string form. Return the `GitHash` of the merge base.


```julia
merge!(repo::GitRepo; kwargs...) -> Bool
```
Perform a git merge on the repository `repo`, merging commits with diverging history into the current branch. Return `true` if the merge succeeded, `false` if not.

The keyword arguments are:

* `committish::AbstractString=""`: Merge the named commit(s) in `committish`.
* `branch::AbstractString=""`: Merge the branch `branch` and all its commits since it diverged from the current branch.
* `fastforward::Bool=false`: If `fastforward` is `true`, only merge if the merge is a fast-forward (the current branch head is an ancestor of the commits to be merged), otherwise refuse to merge and return `false`. This is equivalent to the git CLI option `--ff-only`.
* `merge_opts::MergeOptions=MergeOptions()`: `merge_opts` specifies options for the merge, such as merge strategy in case of conflicts.
* `checkout_opts::CheckoutOptions=CheckoutOptions()`: `checkout_opts` specifies options for the checkout step.

Equivalent to `git merge [--ff-only] [<committish> | <branch>]`.

If you specify a `branch`, this must be done in reference format, since the string will be turned into a `GitReference`. For example, if you wanted to merge branch `branch_a`, you would call `merge!(repo, branch="refs/heads/branch_a")`.


```julia
merge!(repo::GitRepo, anns::Vector{GitAnnotated}; kwargs...) -> Bool
```
Merge changes from the annotated commits (captured as [`GitAnnotated`](https://docs.julialang.org/#LibGit2.GitAnnotated) objects) `anns` into the HEAD of the repository `repo`. The keyword arguments are:

* `merge_opts::MergeOptions = MergeOptions()`: options for how to perform the merge, including whether fastforwarding is allowed. See [`MergeOptions`](https://docs.julialang.org/#LibGit2.MergeOptions) for more information.
* `checkout_opts::CheckoutOptions = CheckoutOptions()`: options for how to perform the checkout. See [`CheckoutOptions`](https://docs.julialang.org/#LibGit2.CheckoutOptions) for more information.

`anns` may refer to remote or local branch heads. Return `true` if the merge is successful, otherwise return `false` (for instance, if no merge is possible because the branches have no common ancestor).

**Examples**


```julia
upst_ann = LibGit2.GitAnnotated(repo, "branch/a")

# merge the branch in
LibGit2.merge!(repo, [upst_ann])
```

```julia
merge!(repo::GitRepo, anns::Vector{GitAnnotated}, fastforward::Bool; kwargs...) -> Bool
```
Merge changes from the annotated commits (captured as [`GitAnnotated`](https://docs.julialang.org/#LibGit2.GitAnnotated) objects) `anns` into the HEAD of the repository `repo`. If `fastforward` is `true`, *only* a fastforward merge is allowed. In this case, if conflicts occur, the merge will fail. Otherwise, if `fastforward` is `false`, the merge may produce a conflict file which the user will need to resolve.

The keyword arguments are:

* `merge_opts::MergeOptions = MergeOptions()`: options for how to perform the merge, including whether fastforwarding is allowed. See [`MergeOptions`](https://docs.julialang.org/#LibGit2.MergeOptions) for more information.
* `checkout_opts::CheckoutOptions = CheckoutOptions()`: options for how to perform the checkout. See [`CheckoutOptions`](https://docs.julialang.org/#LibGit2.CheckoutOptions) for more information.

`anns` may refer to remote or local branch heads. Return `true` if the merge is successful, otherwise return `false` (for instance, if no merge is possible because the branches have no common ancestor).

**Examples**


```julia
upst_ann_1 = LibGit2.GitAnnotated(repo, "branch/a")

# merge the branch in, fastforward
LibGit2.merge!(repo, [upst_ann_1], true)

# merge conflicts!
upst_ann_2 = LibGit2.GitAnnotated(repo, "branch/b")
# merge the branch in, try to fastforward
LibGit2.merge!(repo, [upst_ann_2], true) # will return false
LibGit2.merge!(repo, [upst_ann_2], false) # will return true
```

```julia
ffmerge!(repo::GitRepo, ann::GitAnnotated)
```
Fastforward merge changes into current HEAD. This is only possible if the commit referred to by `ann` is descended from the current HEAD (e.g. if pulling changes from a remote branch which is simply ahead of the local branch tip).


```julia
LibGit2.fullname(ref::GitReference)
```
Return the name of the reference pointed to by the symbolic reference `ref`. If `ref` is not a symbolic reference, return an empty string.


```julia
features()
```
Return a list of git features the current version of libgit2 supports, such as threading or using HTTPS or SSH.


```julia
filename(te::GitTreeEntry)
```
Return the filename of the object on disk to which `te` refers.


```julia
filemode(te::GitTreeEntry) -> Cint
```
Return the UNIX filemode of the object on disk to which `te` refers as an integer.


```julia
LibGit2.gitdir(repo::GitRepo)
```
Return the location of the "git" files of `repo`:

* for normal repositories, this is the location of the `.git` folder.
* for bare repositories, this is the location of the repository itself.

See also [`workdir`](https://docs.julialang.org/#LibGit2.workdir), [`path`](https://docs.julialang.org/#LibGit2.path).


```julia
LibGit2.git_url(; kwargs...) -> String
```
Create a string based upon the URL components provided. When the `scheme` keyword is not provided the URL produced will use the alternative [scp-like syntax](https://git-scm.com/docs/git-clone#_git_urls_a_id_urls_a).

**Keywords**

* `scheme::AbstractString=""`: the URL scheme which identifies the protocol to be used. For HTTP use "http", SSH use "ssh", etc. When `scheme` is not provided the output format will be "ssh" but using the scp-like syntax.
* `username::AbstractString=""`: the username to use in the output if provided.
* `password::AbstractString=""`: the password to use in the output if provided.
* `host::AbstractString=""`: the hostname to use in the output. A hostname is required to be specified.
* `port::Union{AbstractString,Integer}=""`: the port number to use in the output if provided. Cannot be specified when using the scp-like syntax.
* `path::AbstractString=""`: the path to use in the output if provided.

Avoid using passwords in URLs. Unlike the credential objects, Julia is not able to securely zero or destroy the sensitive data after use and the password may remain in memory; possibly to be exposed by an uninitialized memory.

**Examples**


```julia
julia> LibGit2.git_url(username="git", host="github.com", path="JuliaLang/julia.git")
"git@github.com:JuliaLang/julia.git"

julia> LibGit2.git_url(scheme="https", host="github.com", path="/JuliaLang/julia.git")
"https://github.com/JuliaLang/julia.git"

julia> LibGit2.git_url(scheme="ssh", username="git", host="github.com", port=2222, path="JuliaLang/julia.git")
"ssh://git@github.com:2222/JuliaLang/julia.git"
```

```julia
@githash_str -> AbstractGitHash
```
Construct a git hash object from the given string, returning a `GitShortHash` if the string is shorter than 40 hexadecimal digits, otherwise a `GitHash`.

**Examples**


```julia
julia> LibGit2.githash"d114feb74ce633"
GitShortHash("d114feb74ce633")

julia> LibGit2.githash"d114feb74ce63307afe878a5228ad014e0289a85"
GitHash("d114feb74ce63307afe878a5228ad014e0289a85")
```

```julia
LibGit2.head(repo::GitRepo) -> GitReference
```
Return a `GitReference` to the current HEAD of `repo`.


```julia
head(pkg::AbstractString) -> String
```
Return current HEAD [`GitHash`](https://docs.julialang.org/#LibGit2.GitHash) of the `pkg` repo as a string.


```julia
LibGit2.head!(repo::GitRepo, ref::GitReference) -> GitReference
```
Set the HEAD of `repo` to the object pointed to by `ref`.


```julia
LibGit2.head_oid(repo::GitRepo) -> GitHash
```
Lookup the object id of the current HEAD of git repository `repo`.


```julia
LibGit2.headname(repo::GitRepo)
```
Lookup the name of the current HEAD of git repository `repo`. If `repo` is currently detached, return the name of the HEAD it's detached from.


```julia
LibGit2.init(path::AbstractString, bare::Bool=false) -> GitRepo
```
Open a new git repository at `path`. If `bare` is `false`, the working tree will be created in `path/.git`. If `bare` is `true`, no working directory will be created.


```julia
is_ancestor_of(a::AbstractString, b::AbstractString, repo::GitRepo) -> Bool
```
Return `true` if `a`, a [`GitHash`](https://docs.julialang.org/#LibGit2.GitHash) in string form, is an ancestor of `b`, a [`GitHash`](https://docs.julialang.org/#LibGit2.GitHash) in string form.

**Examples**


```julia
julia> repo = LibGit2.GitRepo(repo_path);

julia> LibGit2.add!(repo, test_file1);

julia> commit_oid1 = LibGit2.commit(repo, "commit1");

julia> LibGit2.add!(repo, test_file2);

julia> commit_oid2 = LibGit2.commit(repo, "commit2");

julia> LibGit2.is_ancestor_of(string(commit_oid1), string(commit_oid2), repo)
true
```

```julia
isbinary(blob::GitBlob) -> Bool
```
Use a heuristic to guess if a file is binary: searching for NULL bytes and looking for a reasonable ratio of printable to non-printable characters among the first 8000 bytes.


```julia
iscommit(id::AbstractString, repo::GitRepo) -> Bool
```
Check if commit `id` (which is a [`GitHash`](https://docs.julialang.org/#LibGit2.GitHash) in string form) is in the repository.

**Examples**


```julia
julia> repo = LibGit2.GitRepo(repo_path);

julia> LibGit2.add!(repo, test_file);

julia> commit_oid = LibGit2.commit(repo, "add test_file");

julia> LibGit2.iscommit(string(commit_oid), repo)
true
```

```julia
LibGit2.isdiff(repo::GitRepo, treeish::AbstractString, pathspecs::AbstractString=""; cached::Bool=false)
```
Checks if there are any differences between the tree specified by `treeish` and the tracked files in the working tree (if `cached=false`) or the index (if `cached=true`). `pathspecs` are the specifications for options for the diff.

**Examples**


```julia
repo = LibGit2.GitRepo(repo_path)
LibGit2.isdiff(repo, "HEAD") # should be false
open(joinpath(repo_path, new_file), "a") do f
    println(f, "here's my cool new file")
end
LibGit2.isdiff(repo, "HEAD") # now true
```
Equivalent to `git diff-index <treeish> [-- <pathspecs>]`.


```julia
LibGit2.isdirty(repo::GitRepo, pathspecs::AbstractString=""; cached::Bool=false) -> Bool
```
Check if there have been any changes to tracked files in the working tree (if `cached=false`) or the index (if `cached=true`). `pathspecs` are the specifications for options for the diff.

**Examples**


```julia
repo = LibGit2.GitRepo(repo_path)
LibGit2.isdirty(repo) # should be false
open(joinpath(repo_path, new_file), "a") do f
    println(f, "here's my cool new file")
end
LibGit2.isdirty(repo) # now true
LibGit2.isdirty(repo, new_file) # now true
```
Equivalent to `git diff-index HEAD [-- <pathspecs>]`.


```julia
LibGit2.isorphan(repo::GitRepo)
```
Check if the current branch is an "orphan" branch, i.e. has no commits. The first commit to this branch will have no parents.


```julia
isset(val::Integer, flag::Integer)
```
Test whether the bits of `val` indexed by `flag` are set (`1`) or unset (`0`).


```julia
iszero(id::GitHash) -> Bool
```
Determine whether all hexadecimal digits of the given [`GitHash`](https://docs.julialang.org/#LibGit2.GitHash) are zero.


```julia
lookup_branch(repo::GitRepo, branch_name::AbstractString, remote::Bool=false) -> Union{GitReference, Nothing}
```
Determine if the branch specified by `branch_name` exists in the repository `repo`. If `remote` is `true`, `repo` is assumed to be a remote git repository. Otherwise, it is part of the local filesystem.

Return either a `GitReference` to the requested branch if it exists, or [`nothing`](https://docs.julialang.org/../../base/constants/#Core.nothing) if not.


```julia
LibGit2.map(f::Function, walker::GitRevWalker; oid::GitHash=GitHash(), range::AbstractString="", by::Cint=Consts.SORT_NONE, rev::Bool=false)
```
Using the [`GitRevWalker`](https://docs.julialang.org/#LibGit2.GitRevWalker) `walker` to "walk" over every commit in the repository's history, apply `f` to each commit in the walk. The keyword arguments are: * `oid`: The [`GitHash`](https://docs.julialang.org/#LibGit2.GitHash) of the commit to begin the walk from. The default is to use [`push_head!`](https://docs.julialang.org/#LibGit2.push_head!) and therefore the HEAD commit and all its ancestors. * `range`: A range of `GitHash`s in the format `oid1..oid2`. `f` will be applied to all commits between the two. * `by`: The sorting method. The default is not to sort. Other options are to sort by topology (`LibGit2.Consts.SORT_TOPOLOGICAL`), to sort forwards in time (`LibGit2.Consts.SORT_TIME`, most ancient first) or to sort backwards in time (`LibGit2.Consts.SORT_REVERSE`, most recent first). * `rev`: Whether to reverse the sorted order (for instance, if topological sorting is used).

**Examples**


```julia
oids = LibGit2.with(LibGit2.GitRevWalker(repo)) do walker
    LibGit2.map((oid, repo)->string(oid), walker, by=LibGit2.Consts.SORT_TIME)
end
```
Here, `LibGit2.map` visits each commit using the `GitRevWalker` and finds its `GitHash`.

Mirror callback function

Function sets `+refs/*:refs/*` refspecs and `mirror` flag for remote reference.

C function pointer for `mirror_callback`


```julia
message(c::GitCommit, raw::Bool=false)
```
Return the commit message describing the changes made in commit `c`. If `raw` is `false`, return a slightly "cleaned up" message (which has any leading newlines removed). If `raw` is `true`, the message is not stripped of any such newlines.


```julia
merge_analysis(repo::GitRepo, anns::Vector{GitAnnotated}) -> analysis, preference
```
Run analysis on the branches pointed to by the annotated branch tips `anns` and determine under what circumstances they can be merged. For instance, if `anns[1]` is simply an ancestor of `ann[2]`, then `merge_analysis` will report that a fast-forward merge is possible.

Return two outputs, `analysis` and `preference`. `analysis` has several possible values: * `MERGE_ANALYSIS_NONE`: it is not possible to merge the elements of `anns`. * `MERGE_ANALYSIS_NORMAL`: a regular merge, when HEAD and the commits that the user wishes to merge have all diverged from a common ancestor. In this case the changes have to be resolved and conflicts may occur. * `MERGE_ANALYSIS_UP_TO_DATE`: all the input commits the user wishes to merge can be reached from HEAD, so no merge needs to be performed. * `MERGE_ANALYSIS_FASTFORWARD`: the input commit is a descendant of HEAD and so no merge needs to be performed - instead, the user can simply checkout the input commit(s). * `MERGE_ANALYSIS_UNBORN`: the HEAD of the repository refers to a commit which does not exist. It is not possible to merge, but it may be possible to checkout the input commits. `preference` also has several possible values: * `MERGE_PREFERENCE_NONE`: the user has no preference. * `MERGE_PREFERENCE_NO_FASTFORWARD`: do not allow any fast-forward merges. * `MERGE_PREFERENCE_FASTFORWARD_ONLY`: allow only fast-forward merges and no other type (which may introduce conflicts). `preference` can be controlled through the repository or global git configuration.


```julia
LibGit2.name(ref::GitReference)
```
Return the full name of `ref`.


```julia
name(rmt::GitRemote)
```
Get the name of a remote repository, for instance `"origin"`. If the remote is anonymous (see [`GitRemoteAnon`](https://docs.julialang.org/#LibGit2.GitRemoteAnon)) the name will be an empty string `""`.

**Examples**


```julia
julia> repo_url = "https://github.com/JuliaLang/Example.jl";

julia> repo = LibGit2.clone(cache_repo, "test_directory");

julia> remote = LibGit2.GitRemote(repo, "origin", repo_url);

julia> name(remote)
"origin"
```

```julia
LibGit2.name(tag::GitTag)
```
The name of `tag` (e.g. `"v0.5"`).


```julia
need_update(repo::GitRepo)
```
Equivalent to `git update-index`. Return `true` if `repo` needs updating.


```julia
objtype(obj_type::Consts.OBJECT)
```
Return the type corresponding to the enum value.


```julia
LibGit2.path(repo::GitRepo)
```
Return the base file path of the repository `repo`.

* for normal repositories, this will typically be the parent directory of the ".git" directory (note: this may be different than the working directory, see `workdir` for more details).
* for bare repositories, this is the location of the "git" files.

See also [`gitdir`](https://docs.julialang.org/#LibGit2.gitdir), [`workdir`](https://docs.julialang.org/#LibGit2.workdir).


```julia
peel([T,] ref::GitReference)
```
Recursively peel `ref` until an object of type `T` is obtained. If no `T` is provided, then `ref` will be peeled until an object other than a [`GitTag`](https://docs.julialang.org/#LibGit2.GitTag) is obtained.

* A `GitTag` will be peeled to the object it references.
* A [`GitCommit`](https://docs.julialang.org/#LibGit2.GitCommit) will be peeled to a [`GitTree`](https://docs.julialang.org/#LibGit2.GitTree).

Only annotated tags can be peeled to `GitTag` objects. Lightweight tags (the default) are references under `refs/tags/` which point directly to `GitCommit` objects.


```julia
peel([T,] obj::GitObject)
```
Recursively peel `obj` until an object of type `T` is obtained. If no `T` is provided, then `obj` will be peeled until the type changes.

* A `GitTag` will be peeled to the object it references.
* A `GitCommit` will be peeled to a `GitTree`.

```julia
LibGit2.posixpath(path)
```
Standardise the path string `path` to use POSIX separators.


```julia
push(rmt::GitRemote, refspecs; force::Bool=false, options::PushOptions=PushOptions())
```
Push to the specified `rmt` remote git repository, using `refspecs` to determine which remote branch(es) to push to. The keyword arguments are:

* `force`: if `true`, a force-push will occur, disregarding conflicts.
* `options`: determines the options for the push, e.g. which proxy headers to use. See [`PushOptions`](https://docs.julialang.org/#LibGit2.PushOptions) for more information.

You can add information about the push refspecs in two other ways: by setting an option in the repository's `GitConfig` (with `push.default` as the key) or by calling [`add_push!`](https://docs.julialang.org/#LibGit2.add_push!). Otherwise you will need to explicitly specify a push refspec in the call to `push` for it to have any effect, like so: `LibGit2.push(repo, refspecs=["refs/heads/master"])`.


```julia
push(repo::GitRepo; kwargs...)
```
Pushes updates to an upstream of `repo`.

The keyword arguments are:

* `remote::AbstractString="origin"`: the name of the upstream remote to push to.
* `remoteurl::AbstractString=""`: the URL of `remote`.
* `refspecs=AbstractString[]`: determines properties of the push.
* `force::Bool=false`: determines if the push will be a force push, overwriting the remote branch.
* `credentials=nothing`: provides credentials and/or settings when authenticating against a private `remote`.
* `callbacks=Callbacks()`: user provided callbacks and payloads.

Equivalent to `git push [<remoteurl>|<repo>] [<refspecs>]`.


```julia
LibGit2.push!(w::GitRevWalker, cid::GitHash)
```
Start the [`GitRevWalker`](https://docs.julialang.org/#LibGit2.GitRevWalker) `walker` at commit `cid`. This function can be used to apply a function to all commits since a certain year, by passing the first commit of that year as `cid` and then passing the resulting `w` to [`LibGit2.map`](https://docs.julialang.org/#LibGit2.map).


```julia
LibGit2.push_head!(w::GitRevWalker)
```
Push the HEAD commit and its ancestors onto the [`GitRevWalker`](https://docs.julialang.org/#LibGit2.GitRevWalker) `w`. This ensures that HEAD and all its ancestor commits will be encountered during the walk.


```julia
push_refspecs(rmt::GitRemote) -> Vector{String}
```
Get the *push* refspecs for the specified `rmt`. These refspecs contain information about which branch(es) to push to.

**Examples**


```julia
julia> remote = LibGit2.get(LibGit2.GitRemote, repo, "upstream");

julia> LibGit2.add_push!(repo, remote, "refs/heads/master");

julia> close(remote);

julia> remote = LibGit2.get(LibGit2.GitRemote, repo, "upstream");

julia> LibGit2.push_refspecs(remote)
String["refs/heads/master"]
```

```julia
raw(id::GitHash) -> Vector{UInt8}
```
Obtain the raw bytes of the [`GitHash`](https://docs.julialang.org/#LibGit2.GitHash) as a vector of length 20.


```julia
LibGit2.read_tree!(idx::GitIndex, tree::GitTree)
LibGit2.read_tree!(idx::GitIndex, treehash::AbstractGitHash)
```
Read the tree `tree` (or the tree pointed to by `treehash` in the repository owned by `idx`) into the index `idx`. The current index contents will be replaced.


```julia
LibGit2.rebase!(repo::GitRepo, upstream::AbstractString="", newbase::AbstractString="")
```
Attempt an automatic merge rebase of the current branch, from `upstream` if provided, or otherwise from the upstream tracking branch. `newbase` is the branch to rebase onto. By default this is `upstream`.

If any conflicts arise which cannot be automatically resolved, the rebase will abort, leaving the repository and working tree in its original state, and the function will throw a `GitError`. This is roughly equivalent to the following command line statement:


```julia
git rebase --merge [<upstream>]
if [ -d ".git/rebase-merge" ]; then
    git rebase --abort
fi
```

```julia
LibGit2.ref_list(repo::GitRepo) -> Vector{String}
```
Get a list of all reference names in the `repo` repository.


```julia
LibGit2.reftype(ref::GitReference) -> Cint
```
Return a `Cint` corresponding to the type of `ref`:

* `0` if the reference is invalid
* `1` if the reference is an object id
* `2` if the reference is symbolic

```julia
LibGit2.remotes(repo::GitRepo)
```
Return a vector of the names of the remotes of `repo`.


```julia
remove!(repo::GitRepo, files::AbstractString...)
remove!(idx::GitIndex, files::AbstractString...)
```
Remove all the files with paths specified by `files` in the index `idx` (or the index of the `repo`).


```julia
reset(val::Integer, flag::Integer)
```
Unset the bits of `val` indexed by `flag`, returning them to `0`.


```julia
reset!(payload, [config]) -> CredentialPayload
```
Reset the `payload` state back to the initial values so that it can be used again within the credential callback. If a `config` is provided the configuration will also be updated.

Updates some entries, determined by the `pathspecs`, in the index from the target commit tree.

Sets the current head to the specified commit oid and optionally resets the index and working tree to match.

git reset [<committish>] [–] <pathspecs>... 


```julia
reset!(repo::GitRepo, id::GitHash, mode::Cint=Consts.RESET_MIXED)
```
Reset the repository `repo` to its state at `id`, using one of three modes set by `mode`:

1. `Consts.RESET_SOFT` - move HEAD to `id`.
2. `Consts.RESET_MIXED` - default, move HEAD to `id` and reset the index to `id`.
3. `Consts.RESET_HARD` - move HEAD to `id`, reset the index to `id`, and discard all working changes.

**Examples**


```julia
# fetch changes
LibGit2.fetch(repo)
isfile(joinpath(repo_path, our_file)) # will be false

# fastforward merge the changes
LibGit2.merge!(repo, fastforward=true)

# because there was not any file locally, but there is
# a file remotely, we need to reset the branch
head_oid = LibGit2.head_oid(repo)
new_head = LibGit2.reset!(repo, head_oid, LibGit2.Consts.RESET_HARD)
```
In this example, the remote which is being fetched from *does* have a file called `our_file` in its index, which is why we must reset.

Equivalent to `git reset [--soft | --mixed | --hard] <id>`.

**Examples**


```julia
repo = LibGit2.GitRepo(repo_path)
head_oid = LibGit2.head_oid(repo)
open(joinpath(repo_path, "file1"), "w") do f
    write(f, "111
")
end
LibGit2.add!(repo, "file1")
mode = LibGit2.Consts.RESET_HARD
# will discard the changes to file1
# and unstage it
new_head = LibGit2.reset!(repo, head_oid, mode)
```

```julia
restore(s::State, repo::GitRepo)
```
Return a repository `repo` to a previous `State` `s`, for example the HEAD of a branch before a merge attempt. `s` can be generated using the [`snapshot`](https://docs.julialang.org/#LibGit2.snapshot) function.


```julia
LibGit2.revcount(repo::GitRepo, commit1::AbstractString, commit2::AbstractString)
```
List the number of revisions between `commit1` and `commit2` (committish OIDs in string form). Since `commit1` and `commit2` may be on different branches, `revcount` performs a "left-right" revision list (and count), returning a tuple of `Int`s - the number of left and right commits, respectively. A left (or right) commit refers to which side of a symmetric difference in a tree the commit is reachable from.

Equivalent to `git rev-list --left-right --count <commit1> <commit2>`.

**Examples**


```julia
repo = LibGit2.GitRepo(repo_path)
repo_file = open(joinpath(repo_path, test_file), "a")
println(repo_file, "hello world")
flush(repo_file)
LibGit2.add!(repo, test_file)
commit_oid1 = LibGit2.commit(repo, "commit 1")
println(repo_file, "hello world again")
flush(repo_file)
LibGit2.add!(repo, test_file)
commit_oid2 = LibGit2.commit(repo, "commit 2")
LibGit2.revcount(repo, string(commit_oid1), string(commit_oid2))
```
This will return `(-1, 0)`.


```julia
set_remote_url(repo::GitRepo, remote_name, url)
set_remote_url(repo::String, remote_name, url)
```
Set both the fetch and push `url` for `remote_name` for the [`GitRepo`](https://docs.julialang.org/#LibGit2.GitRepo) or the git repository located at `path`. Typically git repos use `"origin"` as the remote name.

**Examples**


```julia
repo_path = joinpath(tempdir(), "Example")
repo = LibGit2.init(repo_path)
LibGit2.set_remote_url(repo, "upstream", "https://github.com/JuliaLang/Example.jl")
LibGit2.set_remote_url(repo_path, "upstream2", "https://github.com/JuliaLang/Example2.jl")
```

```julia
LibGit2.shortname(ref::GitReference)
```
Return a shortened version of the name of `ref` that's "human-readable".


```julia
julia> repo = LibGit2.GitRepo(path_to_repo);

julia> branch_ref = LibGit2.head(repo);

julia> LibGit2.name(branch_ref)
"refs/heads/master"

julia> LibGit2.shortname(branch_ref)
"master"
```

```julia
snapshot(repo::GitRepo) -> State
```
Take a snapshot of the current state of the repository `repo`, storing the current HEAD, index, and any uncommitted work. The output `State` can be used later during a call to [`restore`](https://docs.julialang.org/#LibGit2.restore) to return the repository to the snapshotted state.


```julia
LibGit2.split_cfg_entry(ce::LibGit2.ConfigEntry) -> Tuple{String,String,String,String}
```
Break the `ConfigEntry` up to the following pieces: section, subsection, name, and value.

**Examples**

Given the git configuration file containing:


```julia
[credential "https://example.com"]
    username = me
```
The `ConfigEntry` would look like the following:


```julia
julia> entry
ConfigEntry("credential.https://example.com.username", "me")

julia> LibGit2.split_cfg_entry(entry)
("credential", "https://example.com", "username", "me")
```
Refer to the [git config syntax documentation](https://git-scm.com/docs/git-config#_syntax) for more details.


```julia
LibGit2.status(repo::GitRepo, path::String) -> Union{Cuint, Cvoid}
```
Lookup the status of the file at `path` in the git repository `repo`. For instance, this can be used to check if the file at `path` has been modified and needs to be staged and committed.


```julia
stage(ie::IndexEntry) -> Cint
```
Get the stage number of `ie`. The stage number `0` represents the current state of the working tree, but other numbers can be used in the case of a merge conflict. In such a case, the various stage numbers on an `IndexEntry` describe which side(s) of the conflict the current state of the file belongs to. Stage `0` is the state before the attempted merge, stage `1` is the changes which have been made locally, stages `2` and larger are for changes from other branches (for instance, in the case of a multi-branch "octopus" merge, stages `2`, `3`, and `4` might be used).


```julia
LibGit2.tag_create(repo::GitRepo, tag::AbstractString, commit; kwargs...)
```
Create a new git tag `tag` (e.g. `"v0.5"`) in the repository `repo`, at the commit `commit`.

The keyword arguments are:

* `msg::AbstractString=""`: the message for the tag.
* `force::Bool=false`: if `true`, existing references will be overwritten.
* `sig::Signature=Signature(repo)`: the tagger's signature.

```julia
LibGit2.tag_delete(repo::GitRepo, tag::AbstractString)
```
Remove the git tag `tag` from the repository `repo`.


```julia
LibGit2.tag_list(repo::GitRepo) -> Vector{String}
```
Get a list of all tags in the git repository `repo`.


```julia
LibGit2.target(tag::GitTag)
```
The `GitHash` of the target object of `tag`.


```julia
toggle(val::Integer, flag::Integer)
```
Flip the bits of `val` indexed by `flag`, so that if a bit is `0` it will be `1` after the toggle, and vice-versa.


```julia
transact(f::Function, repo::GitRepo)
```
Apply function `f` to the git repository `repo`, taking a [`snapshot`](https://docs.julialang.org/#LibGit2.snapshot) before applying `f`. If an error occurs within `f`, `repo` will be returned to its snapshot state using [`restore`](https://docs.julialang.org/#LibGit2.restore). The error which occurred will be rethrown, but the state of `repo` will not be corrupted.


```julia
treewalk(f, tree::GitTree, post::Bool=false)
```
Traverse the entries in `tree` and its subtrees in post or pre order. Preorder means beginning at the root and then traversing the leftmost subtree (and recursively on down through that subtree's leftmost subtrees) and moving right through the subtrees. Postorder means beginning at the bottom of the leftmost subtree, traversing upwards through it, then traversing the next right subtree (again beginning at the bottom) and finally visiting the tree root last of all.

The function parameter `f` should have following signature:


```julia
(String, GitTreeEntry) -> Cint
```
A negative value returned from `f` stops the tree walk. A positive value means that the entry will be skipped if `post` is `false`.


```julia
upstream(ref::GitReference) -> Union{GitReference, Nothing}
```
Determine if the branch containing `ref` has a specified upstream branch.

Return either a `GitReference` to the upstream branch if it exists, or [`nothing`](https://docs.julialang.org/../../base/constants/#Core.nothing) if the requested branch does not have an upstream counterpart.


```julia
update!(repo::GitRepo, files::AbstractString...)
update!(idx::GitIndex, files::AbstractString...)
```
Update all the files with paths specified by `files` in the index `idx` (or the index of the `repo`). Match the state of each file in the index with the current state on disk, removing it if it has been removed on disk, or updating its entry in the object database.


```julia
url(rmt::GitRemote)
```
Get the fetch URL of a remote git repository.

**Examples**


```julia
julia> repo_url = "https://github.com/JuliaLang/Example.jl";

julia> repo = LibGit2.init(mktempdir());

julia> remote = LibGit2.GitRemote(repo, "origin", repo_url);

julia> LibGit2.url(remote)
"https://github.com/JuliaLang/Example.jl"
```

```julia
version() -> VersionNumber
```
Return the version of libgit2 in use, as a [`VersionNumber`](https://docs.julialang.org/../../manual/strings/#man-version-number-literals).


```julia
with(f::Function, obj)
```
Resource management helper function. Applies `f` to `obj`, making sure to call `close` on `obj` after `f` successfully returns or throws an error. Ensures that allocated git resources are finalized as soon as they are no longer needed.


```julia
with_warn(f::Function, ::Type{T}, args...)
```
Resource management helper function. Apply `f` to `args`, first constructing an instance of type `T` from `args`. Makes sure to call `close` on the resulting object after `f` successfully returns or throws an error. Ensures that allocated git resources are finalized as soon as they are no longer needed. If an error is thrown by `f`, a warning is shown containing the error.


```julia
LibGit2.workdir(repo::GitRepo)
```
Return the location of the working directory of `repo`. This will throw an error for bare repositories.

This will typically be the parent directory of `gitdir(repo)`, but can be different in some cases: e.g. if either the `core.worktree` configuration variable or the `GIT_WORK_TREE` environment variable is set.

See also [`gitdir`](https://docs.julialang.org/#LibGit2.gitdir), [`path`](https://docs.julialang.org/#LibGit2.path).


```julia
(::Type{T})(te::GitTreeEntry) where T<:GitObject
```
Get the git object to which `te` refers and return it as its actual type (the type [`entrytype`](https://docs.julialang.org/#LibGit2.entrytype) would show), for instance a `GitBlob` or `GitTag`.

**Examples**


```julia
tree = LibGit2.GitTree(repo, "HEAD^{tree}")
tree_entry = tree[1]
blob = LibGit2.GitBlob(tree_entry)
```
Credential that support only `user` and `password` parameters


```julia
isfilled(cred::AbstractCredential) -> Bool
```
Verifies that a credential is ready for use in authentication.

Caches credential information for re-use


```julia
LibGit2.CredentialPayload
```
Retains the state between multiple calls to the credential callback for the same URL. A `CredentialPayload` instance is expected to be `reset!` whenever it will be used with a different URL.


```julia
approve(payload::CredentialPayload; shred::Bool=true) -> Nothing
```
Store the `payload` credential for re-use in a future authentication. Should only be called when authentication was successful.

The `shred` keyword controls whether sensitive information in the payload credential field should be destroyed. Should only be set to `false` during testing.


```julia
reject(payload::CredentialPayload; shred::Bool=true) -> Nothing
```
Discard the `payload` credential from begin re-used in future authentication. Should only be called when authentication was unsuccessful.

The `shred` keyword controls whether sensitive information in the payload credential field should be destroyed. Should only be set to `false` during testing.





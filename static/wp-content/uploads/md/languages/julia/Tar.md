
```julia
tree_hash([ predicate, ] tarball;
          [ algorithm = "git-sha1", ]
          [ skip_empty = false ]) -> hash::String

    predicate  :: Header --> Bool
    tarball    :: Union{AbstractString, AbstractCmd, IO}
    algorithm  :: AbstractString
    skip_empty :: Bool
```
Compute a tree hash value for the file tree that the tarball contains. By default, this uses git's tree hashing algorithm with the SHA1 secure hash function (like current versions of git). This means that for any tarball whose file tree git can represent—i.e. one with only files, symlinks and non-empty directories—the hash value computed by this function will be the same as the hash value git would compute for that file tree. Note that tarballs can represent file trees with empty directories, which git cannot store, and this function can generate hashes for those, which will, by default (see `skip_empty` below for how to change this behavior), differ from the hash of a tarball which omits those empty directories. In short, the hash function agrees with git on all trees which git can represent, but extends (in a consistent way) the domain of hashable trees to other trees which git cannot represent.

If a `predicate` function is passed, it is called on each `Header` object that is encountered while processing `tarball` and an entry is only hashed if `predicate(hdr)` is true. This can be used to selectively hash only parts of an archive, to skip entries that cause `extract` to throw an error, or to record what is extracted during the hashing process.

Before it is passed to the predicate function, the `Header` object is somewhat modified from the raw header in the tarball: the `path` field is normalized to remove `.` entries and replace multiple consecutive slashes with a single slash. If the entry has type `:hardlink`, the link target path is normalized the same way so that it will match the path of the target entry; the size field is set to the size of the target path (which must be an already-seen file).

Currently supported values for `algorithm` are `git-sha1` (the default) and `git-sha256`, which uses the same basic algorithm as `git-sha1` but replaces the SHA1 hash function with SHA2-256, the hash function that git will transition to using in the future (due to known attacks on SHA1). Support for other file tree hashing algorithms may be added in the future.

The `skip_empty` option controls whether directories in the tarball which recursively contain no files or symlinks are included in the hash or ignored. In general, if you are hashing the content of a tarball or a file tree, you care about all directories, not just non-empty ones, so including these in the computed hash is the default. So why does this function even provide the option to skip empty directories? Because git refuses to store empty directories and will ignore them if you try to add them to a repo. So if you compute a reference tree hash by by adding files to a git repo and then asking git for the tree hash, the hash value that you get will match the hash value computed by `tree_hash` with `skip_empty=true`. In other words, this option allows `tree_hash` to emulate how git would hash a tree with empty directories. If you are hashing trees that may contain empty directories (i.e. do not come from a git repo), however, it is recommended that you hash them using a tool (such as this one) that does not ignore empty directories.





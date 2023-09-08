
```julia
crc32c(data, crc::UInt32=0x00000000)
```
Compute the CRC-32c checksum of the given `data`, which can be an `Array{UInt8}`, a contiguous subarray thereof, or a `String`. Optionally, you can pass a starting `crc` integer to be mixed in with the checksum. The `crc` parameter can be used to compute a checksum on data divided into chunks: performing `crc32c(data2, crc32c(data1))` is equivalent to the checksum of `[data1; data2]`. (Technically, a little-endian checksum is computed.)

There is also a method `crc32c(io, nb, crc)` to checksum `nb` bytes from a stream `io`, or `crc32c(io, crc)` to checksum all the remaining bytes. Hence you can do [`open(crc32c, filename)`](https://docs.julialang.org/../../base/io-network/#Base.open) to checksum an entire file, or `crc32c(seekstart(buf))` to checksum an [`IOBuffer`](https://docs.julialang.org/../../base/io-network/#Base.IOBuffer) without calling [`take!`](https://docs.julialang.org/../../base/io-network/#Base.take!-Tuple%7BBase.GenericIOBuffer%7D).

For a `String`, note that the result is specific to the UTF-8 encoding (a different checksum would be obtained from a different Unicode encoding). To checksum an `a::Array` of some other bitstype, you can do `crc32c(reinterpret(UInt8,a))`, but note that the result may be endian-dependent.





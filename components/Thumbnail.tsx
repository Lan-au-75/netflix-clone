import Image from 'next/image'
import { baseUrl } from '../constants/movie'
import { Movie } from '../typings'

interface Props {
    movie: Movie
}

function Thumbnail({ movie }: Props) {
    return (
        <div
            className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px]
        md:hover:scale-105"
        >
            <Image
                src={`${baseUrl}${movie.backdrop_path || movie.poster_path}`}
                className="rounded-sm object-cover object-center md:rounded"
                fill
                priority
                alt=""
                sizes="(min-width: 768px) 260px,
                        (max-width: 767px) 180px"
            />
        </div>
    )
}

export default Thumbnail

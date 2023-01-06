import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/24/solid'
import { useRecoilState } from 'recoil'

import { baseUrl } from '../constants/movie'
import { Movie } from '../typings'
import { modalState, movieState } from '../atoms/modalAtom'

interface Props {
    netflixOriginals: Movie[]
}

function Banner({ netflixOriginals }: Props) {
    const [movie, setMovie] = useState<Movie | null>(null)
    const [, setCurrentMovie] = useRecoilState(movieState)
    const [, setShowModal] = useRecoilState(modalState)

    useEffect(() => {
        // random when reload this page
        setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
    }, [netflixOriginals])

    return (
        <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
            <div className="absolute top-0 left-0 w-screen h-[95vh] -z-10">
                {movie?.backdrop_path && (
                    <Image
                        className="object-cover object-center"
                        src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
                        alt=""
                        priority
                        fill
                    />
                )}
            </div>

            <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
                {movie?.title || movie?.name || movie?.original_name}
            </h1>
            <p className="max-w-xs text-shadow-md text-xs md:max-w-lg lg:max-w-2xl lg:text-2xl">
                {movie?.overview}
            </p>

            <div className="flex space-x-3">
                <button className="bannerButton bg-white text-black">
                    <FaPlay className="text-black md:h-7 md:w-7" size={16} /> Play
                </button>
                <button
                    className="bannerButton bg-[gray]/70"
                    onClick={() => {
                        setCurrentMovie(movie)
                        setShowModal(true)
                    }}
                >
                    More Info <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
                </button>
            </div>
        </div>
    )
}

export default Banner

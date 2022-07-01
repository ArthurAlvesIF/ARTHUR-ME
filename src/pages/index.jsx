/* eslint-disable react/prop-types */
import redirect from 'nextjs-redirect'
import Image from 'next/image'
import React from 'react'
import { AiOutlineInstagram } from 'react-icons/ai'
import { TailSpin } from 'react-loader-spinner'
import logo from '../images/logo.png'
import api from '../tools/api'
// eslint-disable-next-line react/prop-types
function Button({ name, location, id }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const Redirect = redirect(location)

  const onClick = async () => {
    if (isLoading) return
    setIsLoading(true)
    await api.post('/statistics', { summaryId: id })
    setIsLoading('loaded')
  }
  return (
    <div
      className="bg-slate-800 rounded-xl w-2/3 xl:w-1/3 text-white font-bold text-xl lg:text-2xl text-center p-2 lg:p-4 shadow-xl border-2 border-white mt-4"
      role="button"
      tabIndex={0}
      onKeyDown={onClick}
      onClick={onClick}
    >
      {isLoading === false && name}
      {isLoading && (
        <div className="flex flex-col justify-center items-center">
          <TailSpin color="white" width={30} height={30} />
        </div>
      )}
      {isLoading === 'loaded' && (
        <Redirect>
          <div />
        </Redirect>
      )}
    </div>
  )
}
export default function Home({ summaries }) {
  return (
    <div className="flex flex-col w-screen min-h-screen items-center xl:justify-center bg-blue">
      <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-72 lg:h-72 mt-12 md:mt-24 lg:mt-32 -xl:mt-72">
        <Image src={logo} layout="fill" objectFit="contain" />
      </div>
      <div className="text-center font-bold text-2xl lg:text-3xl text-white mt-6">
        Resumos
      </div>
      <div className="text-center font-bold text-2xl lg:text-3xl text-white">
        Medicina de emergência
      </div>
      {summaries.map((summary) => (
        <Button {...summary} key={summary.id} />
      ))}
      <a
        style={{ marginTop: 'auto', bottom: 0 }}
        className="flex flex-row justify-center items-center"
        role="button"
        href="https://instagram.com/arthur.antonio.fa"
      >
        <AiOutlineInstagram size={25} color="white" />
        <div className="text-white font-bold lg:text-xl">
          /arthur.antonio.fa
        </div>
      </a>
    </div>
  )
}
export async function getStaticProps() {
  const { data } = await api.get('/summaries')

  return {
    props: {
      summaries: data,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 3600, // In seconds
  }
}

import { PropagateLoader } from 'react-spinners'

const Loader = () => {
  return (
    <>
      <div className="w-svw h-svh grid place-items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary z-[100]">
        <div className="grid place-items-center gap-8">
          {/* <img src="/images/logo.png" alt="Logo" width="300" height="300" /> */}
          <div className="grid place-items-center gap-1">
            <img src="/images/favicon.png" className="bg-blend-multiply" alt="Logo" width="100" height="100" />
            <p className="font-semibold text-[#32414f]">Urban Company</p>
          </div>
          <PropagateLoader size={8} speedMultiplier={0.9} color="#32414f" />
        </div>
      </div>
    </>
  )
}

export default Loader

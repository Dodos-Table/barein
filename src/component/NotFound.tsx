import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex h-100">
      <div className='m-auto text-center'>
        <h2 className='text-2xl'>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link to="/">Return Home</Link>
      </div>
    </div>
  )
}

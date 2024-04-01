import React, { Suspense, useState } from "react"
import "./App.css"
import { RouterProvider } from "react-router-dom"
import { Router } from "./routes"

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(true)
	const router = Router(isAuthenticated)

	return (
		<>
			<Suspense fallback={<h1>Page is Loading...</h1>}>
				<RouterProvider router={router} />
			</Suspense>
		</>
	)
}

export default App

import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						if (id.includes('react-bootstrap') || id.includes('bootstrap')) {
							return 'bootstrap-vendor'
						}

						if (id.includes('firebase')) {
							return 'firebase-vendor'
						}

						if (id.includes('react-icons')) {
							return 'icons-vendor'
						}

						if (id.includes('react-helmet-async')) {
							return 'helmet-vendor'
						}

						if (id.includes('styled-components')) {
							return 'styled-vendor'
						}

						return 'vendor'
					}
				}
			}
		}
	}
})

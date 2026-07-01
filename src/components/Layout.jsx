import React from 'react'
import Header from './Header'
import Footer from './Footer'
export default function Layout({children}){
  return (
    <div className="app-shell">
      <Header />
      <main className="container main-content">{children}</main>
      <Footer />
    </div>
  )
}

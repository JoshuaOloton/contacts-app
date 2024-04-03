import React, { useEffect, useState } from 'react'
import { Outlet, NavLink, useLoaderData, Form, redirect, useNavigation, useSubmit } from 'react-router-dom'
import { getContacts, createContact } from '../contacts'
import { FiPlusCircle } from "react-icons/fi"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

export const loader = async ({ request }) => {
  const url = new URL(request.url)
  const q = url.searchParams.get("q") || ""
  const contacts = await getContacts(q)
  return { contacts, q }
}

export const action = async () => {
  const contact = await createContact()
  return redirect(`/contacts/${contact.id}/edit`)
}

const Root = () => {
  const { contacts, q } = useLoaderData()
  const navigation = useNavigation()
  const submit = useSubmit()
  const searching = 
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
      )

  const [query, setQuery] = useState(q)

  useEffect(() => {
   setQuery(q)
  }, [q])

  return (
    <>
      <div id="sidebar">
        <h1>Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              type="search"
              className={searching ? "loading" : ""}
              name="q"
              placeholder="Search contacts"
              aria-label="Search contacts"
              value={query}
              onChange={e => {
                setQuery(e.target.value)
                submit(e.currentTarget.form)
              }}
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            ></div>
            <div 
              className='sr-only'
              aria-live='polite'
            ></div>
          </Form>
          <Form method="post">
            <button type="submit"><FiPlusCircle /></button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink 
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) => {
                      return isActive
                        ? "active"
                        : isPending 
                        ? "pending" 
                        : null; 
                    }}
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div 
        id="detail"
        // className={navigation.state === "loading" ? "loading" : ""}
      >
        { navigation.state === "loading"
          ? <Skeleton
              height={25}
              count={4}
              style={{ marginTop: '0.8rem', marginBottom: '0.3rem' }} 
              baseColor='#dedede'
              highlightColor='#f5f5f5'
            />
          : <Outlet />}
        
      </div>
    </>
  )
}

export default Root
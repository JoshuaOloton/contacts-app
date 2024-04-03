import React from 'react'
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom"
import { updateContact } from '../contacts'

export const action = async({ request, params }) => {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  let x = await updateContact(params.contactId, updates)
  return redirect(`/contacts/${params.contactId}`)
}

const EditContact = () => {
  const { contact } = useLoaderData()
  const navigate = useNavigate()

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          type="text"
          name="first"
          placeholder="First"
          defaultValue={contact.first}
          aria-label="First name"
        />
        <input
          type="text"
          name="last"
          placeholder="Last"
          defaultValue={contact.last}
          aria-label="Last name"
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          placeholder="@username"
          defaultValue={contact.twitter}
          name="twitter"
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          type="text"
          placeholder="https://example.com/avatar.jpg"
          defaultValue={contact.avatar}
          name="avatar"
          aria-label="Avatar URL"
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          rows="6"
          defaultValue={contact.notes}
        ></textarea>
      </label>
      <p>
        <button type="submit">Save</button>
        <button 
          type="button"
          onClick={() => {
            navigate(-1)
          }}
        >Cancel</button>
      </p>
    </Form>
  )
}

export default EditContact
"use client"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function signUpPage(){
  return (
    <div   className="relative flex min-h-screen items-center justify-center px-6"
           style={{
             backgroundImage: `
          linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9)),
          url("/5.jpg")
        `,
             backgroundSize: "cover",
             backgroundPosition: "center",
           }}
    >
      <form className="w-full text-slate-200 max-w-md rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-black backdrop-blur-xl transition-all duration-300 hover:shadow-yellow-500/10 p-5">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="form-name">Name</FieldLabel>
            <Input
              id="form-name"
              type="text"
              placeholder="Evil Rabbit"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="form-email">Email</FieldLabel>
            <Input
              id="form-email"
              type="email"
              placeholder="john@example.com"
            />
            <FieldDescription>
              We&apos;ll never share your email with anyone.
            </FieldDescription>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="form-phone">Phone</FieldLabel>
              <Input
                id="form-phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="form-country">Country</FieldLabel>
              <Select defaultValue="us">
                <SelectTrigger id="form-country">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="form-address">Address</FieldLabel>
            <Input id="form-address" type="text" placeholder="123 Main St" />
          </Field>
          <Field orientation="horizontal">
            <Button type="button" variant="outline" className="text-slate-800 ">
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
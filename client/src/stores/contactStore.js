import { defineStore } from "pinia";

export const useContactStore = defineStore("contact", {
  async sendEmail(contact) {
    const response = await sendEmail.send(contact);
    console.log("response of conatct: ",response)
    return response;
  },
});



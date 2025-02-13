import type { Card } from "@src/lib/card-slice"
import { API_URL } from "@src/constants"

export async function fetchCards(): Promise<Card[]> {
  const response = await fetch(`${API_URL}/api/notes`)
  if (!response.ok) {
    throw new Error("Failed to fetch cards")
  }
  return response.json()
}


export async function saveCard(card: Card): Promise<void> {
  if (card._id.length === 21){
    const response = await fetch(`${API_URL}/api/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          title: card.title,
          content: card.content,
          position: card.position,
      }),
    })
    if (!response.ok) {
      throw new Error("Failed to save cards")
    }
  } else {
    const response = await fetch(`${API_URL}/api/notes/${card._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          title: card.title,
          content: card.content,
          position: card.position,
      }),
    })
    if (!response.ok) {
      throw new Error("Failed to save cards")
    }
  }
}


export async function saveCards(cards: Card[]): Promise<void> {
    const data = cards.map((card) => ({
      title: card.title,
      content: card.content,
      position: card.position,
    }))
  const response = await fetch(`${API_URL}/api/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error("Failed to save cards")
  }
}

export async function deleteCardFromBackend(cardId: string): Promise<void> {
  if (cardId.length === 24){
    const response = await fetch(`${API_URL}/api/notes/${cardId}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("Failed to delete card")
    }
  } 
}


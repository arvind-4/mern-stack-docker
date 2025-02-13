"use client"

import type React from "react"
import { useCallback, useEffect } from "react"
import ReactFlow, { Background, Controls, MiniMap, useNodesState } from "reactflow"
import "reactflow/dist/style.css"
import { useDispatch, useSelector } from "react-redux"
import { nanoid } from "nanoid"
import { Button } from "@src/components/ui/button"
import { Card } from "@src/components/ui/card"
import { Input } from "@src/components/ui/input"
import { Textarea } from "@src/components/ui/textarea"
import type { AppDispatch, RootState } from "@src/lib/store"
import {
  addCard,
  updateCard,
  type Card as CardType,
  fetchCardsAsync,
  saveCardsAsync,
  deleteCardAsync,
  saveCardAsync,
} from "@src/lib/card-slice"
import { API_URL } from "@src/constants"

const CardNode = ({ data }: { data: CardType }) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(updateCard({ ...data, [e.target.name]: e.target.value }))
  }


  const handleDelete = () => {
    dispatch(deleteCardAsync(data._id))
  }

  const handleAI = async () => {
    const response = await fetch(`${API_URL}/api/enhance-note`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: data.content,
      }),
    })
    if (!response.ok) {
      throw new Error("Failed to enhance note")
    }
    const _data = await response.json()
    const aiContent = _data.content
    dispatch(updateCard({ ...data, content: aiContent }))
  }

  const handleSave = () => {
    dispatch(saveCardAsync(data))
  }

  console.log("DATA", data)

  return (
    <Card className="w-64 p-4">
      <Input name="title" value={data.title} onChange={handleChange} placeholder="Title" className="mb-2" />
      <Textarea
        name="content"
        value={data.content}
        onChange={handleChange}
        placeholder="Content"
        className="mb-2"
      />
      <Button onClick={handleSave} variant="default" size="sm">
        Save
      </Button>
      <Button onClick={handleAI} variant="ghost" size="sm" className="ml-2">
        AI
      </Button>
      <Button onClick={handleDelete} variant="destructive" size="sm">
        Delete
      </Button>
    </Card>
  )
}

const nodeTypes = {
  card: CardNode,
}

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const { cards, status, error } = useSelector((state: RootState) => state.cards)
  const [nodes, setNodes, onNodesChange] = useNodesState([])

  useEffect(() => {
    dispatch(fetchCardsAsync())
  }, [dispatch])

  useEffect(() => {
    setNodes(
      cards.map((card) => ({
        key: card._id,
        id: card._id,
        type: "card" as const,
        position: card.position,
        data: card,
      })),
    )
  }, [cards, setNodes])

  const onNodeDragStop = useCallback(
    (_: any, node: any) => {
      dispatch(
        updateCard({
          _id: node.data._id,
          ...node.data,
          position: node.position,
        }),
      )
    },
    [dispatch],
  )

  const handleAddCard = () => {
    console.log("NANOID", nanoid())
    const newCard: CardType = {
      _id: nanoid(),
      title: "New Card",
      content: "Description",
      position: { x: window.innerWidth / 2 - 100, y: window.innerHeight / 2 - 75 },
    }
    dispatch(addCard(newCard))
  }

  useEffect(() => {
    const handleBeforeUnload = () => {
      dispatch(saveCardsAsync(cards))
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    document.addEventListener("visibilitychange", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      document.removeEventListener("visibilitychange", handleBeforeUnload)
    }
  }, [cards, dispatch])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "failed") {
    return <div>Error: {error}</div>
  }


  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow nodes={nodes} onNodesChange={onNodesChange} onNodeDragStop={onNodeDragStop} nodeTypes={nodeTypes}>
        <Background />
        <Controls />
        {/* <MiniMap /> */}
      </ReactFlow>
      <div className="absolute top-4 left-4">
        <Button onClick={handleAddCard}>Add Card</Button>
      </div>
    </div>
  )
}


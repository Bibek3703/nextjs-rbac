"use client"

import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button'
import { 
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogHeader,
    DialogDescription,
    DialogFooter,
    DialogClose
 } from '@/components/ui/dialog';
import { CircleIcon, CircleXIcon, SaveIcon } from 'lucide-react';

export default function TodoHeaderActions() {
    const [open, setOpen] = useState(false)

  return (
    <div className='flex items-center gap-4'>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className='h-auto w-auto p-1.5 px-4'>
                    Add Todo
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Todo</DialogTitle>
                    <DialogDescription>
                        Add new todo information
                    </DialogDescription>
                </DialogHeader>
                <div>sdfs</div>
                <DialogFooter>
                    <div className='w-full flex justify-between items-center pt-4'>
                        <Button variant="destructive" className='h-auto'>
                            <CircleXIcon/>
                            <span>Close</span>
                        </Button>
                        <Button type="submit" className='h-auto'>
                            <SaveIcon />
                            <span>Save changes</span>
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
   )
}

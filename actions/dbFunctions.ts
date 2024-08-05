"use server"
import prisma from '@/db';

export const deleteCartItem = async (cartItemId: number) => {
    try {
        await prisma.cartItems.delete({
            where: { CartItemID: cartItemId },
        });
    } catch (error) {
        throw new Error('Failed to delete item');
    }
};

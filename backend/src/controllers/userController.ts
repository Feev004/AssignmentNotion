import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

const _token = "ntn_b10296201043GsFXybAC9zgtsUe7SEPPravIZUzWsM7fhF"
const _db_id = "1d203d5ec1888072aad8e1f380296772"

const notion = axios.create({
    baseURL: 'https://api.notion.com/v1',
    headers: {
        Authorization: `Bearer ${_token}`,
        'Notion-Version': '2022-06-28',
    }
});

// Get users
export const getUsers = async (_req: Request, res: Response) => {

    const { data } = await notion.post(`/databases/${_db_id}/query`);
    console.log(data);

    const users = data.results.map((user: any) => ({
        // id: user.id,
        // name: user.properties.Name.title[0]?.plain_text,
        // email: user.properties.Email.email,
        // role: user.properties.Role.rich_text[0]?.plain_text,
        id: user.id,
        name: user.properties.Name.title[0]?.text.content,
        email: user.properties.Email.email,
        age: user.properties.Age.number,
        role: user.properties.Role.rich_text[0]?.text.content,
        recommend: user.properties.Recommend.rich_text[0]?.text.content,
        feature: user.properties.Feature.rich_text[0]?.text.content,
        comments: user.properties.Comments.rich_text[0]?.text.content,
    }));
    res.json(users);
};

// Create User
export const createUser = async (req: Request, res: Response) => {
    // const { name, email, role } = req.body;
    const { name, email, age, role, recommend, feature, comments } = req.body;

    // if (!name || !email || !role) {
    //     res.status(400).json({ error: "Please provide name, email, and role." });
    // }
    if ( !name || !email || !age || !role || !recommend || !feature || !comments) {
        res.status(400).json({ error: "Please provide name, email, role, age, recommend, feature, and comments." });
    }else {
        try {
            // 👇 Query Notion for existing email
            const queryResponse = await notion.post(`/databases/${_db_id}/query`, {
                filter: {
                    property: "Email",
                    email: {
                        equals: email,
                    },
                },
            });

            if (queryResponse.data.results.length > 0) {
                res.status(400).json({ error: "Email already exists." });
            } else {

                // 👇 If no duplicate, proceed with creation
                await notion.post('/pages', {
                    parent: { database_id: _db_id },
                    properties: {
                        Name: { title: [{ text: { content: name } }] },
                        Email: { email: email },
                        Age: { number: age },
                        Role: { rich_text: [{ text: { content: role } }] },
                        Recommend: { rich_text: [{ text: { content: recommend } }] },
                        Feature: { rich_text: [{ text: { content: feature } }] },
                        Comments: { rich_text: [{ text: { content: comments } }] },
                    }
                });
                res.status(201).json({ message: 'User created' });
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    //  else {
    //     try {
    //         // 👇 Query Notion for existing email
    //         const queryResponse = await notion.post(`/databases/${_db_id}/query`, {
    //             filter: {
    //                 property: "Email",
    //                 email: {
    //                     equals: email,
    //                 },
    //             },
    //         });

    //         if (queryResponse.data.results.length > 0) {
    //             res.status(400).json({ error: "Email already exists." });
    //         } else {

    //             // 👇 If no duplicate, proceed with creation
    //             await notion.post('/pages', {
    //                 parent: { database_id: _db_id },
    //                 properties: {
    //                     Name: { title: [{ text: { content: name } }] },
    //                     Email: { email: email },
    //                     Role: { rich_text: [{ text: { content: role } }] },
    //                 }
    //             });
    //             res.status(201).json({ message: 'User created' });
    //         }
    //     } catch (error: any) {
    //         res.status(500).json({ error: error.message });
    //     }
    // }
};

// Update User
export const updateUser = async (req: Request, res: Response) => {
    // const { id } = req.params;
    // const { name, email, role } = req.body;
    // await notion.patch(`/pages/${id}`, {
    //     properties: {
    //         Name: { title: [{ text: { content: name } }] },
    //         Email: { email: email },
    //         Role: { rich_text: [{ text: { content: role } }] },
    //     }
    // });
    // res.json({ message: 'User updated' });
    const { id } = req.params;
    const { name, email, age, role, recommend, feature, comments } = req.body;
    await notion.patch(`/pages/${id}`, {
        properties: {
            Name: { title: [{ text: { content: name } }] },
            Email: { email: email },
            Age: { number: age },
            Role: { rich_text: [{ text: { content: role } }] },
            Recommend: { rich_text: [{ text: { content: recommend } }] },
            Feature: { rich_text: [{ text: { content: feature } }] },
            Comments: { rich_text: [{ text: { content: comments } }] },
        }
    });
    res.json({ message: 'User updated' });
};

// Delete User
export const deleteUser = async (req: Request, res: Response) => {
    // const { id } = req.params;
    // await notion.patch(`/pages/${id}`, { archived: true });
    // res.json({ message: 'User deleted' });
    const { id } = req.params;
    await notion.patch(`/pages/${id}`, { archived: true });
    res.json({ message: 'User deleted' });
};

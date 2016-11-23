export class Issue {
    id: number;
    title: string;
    number: number;
    html_url: string;
    state: string;
    locked: string;
    user: {};
    score: number;
    labels: [];
    comments: [];
    updated_at: string;
    closed_at: string;
}

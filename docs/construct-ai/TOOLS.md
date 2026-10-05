# ConstructAI Tools

## Tool Execution Architecture
Agents perform read and write operations via explicit tools registered in the Tool Registry.
LLMs are strictly prohibited from executing raw SQL, shell commands, or arbitrary HTTP requests.
All tools validate user permissions and respect tenant isolation.

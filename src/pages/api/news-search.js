import axios from "axios";

export default async function handler(req, res) {
  const { query, page = 1 } = req.query;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const pageSize = 12;

  try {
    const params = {
      apiKey,
      pageSize,
      page,
      q: query,
    };

    const response = await axios.get(`https://newsapi.org/v2/everything`, {
      params,
    });

    res.status(200).json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Failed to fetch news articles. Please try again later.",
      });
  }
}

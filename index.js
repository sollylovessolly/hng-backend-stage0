const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
  origin: '*'
}));

app.get('/api/classify', async (req, res) => {
  const name = req.query.name;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({
      status: 'error',
      message: 'name must not be empty...'
    });
  }

  try {

    const apiResponse = await fetch(`https://api.genderize.io/?name=${encodeURIComponent(name.trim())}`);
    const data = await apiResponse.json();

    if (data.gender === null || data.count === 0) {
      return res.status(422).json({   
        status: 'error',
        message: 'No prediction for that provided name'
      });
    }


    const processedData = {
      name: data.name,
      gender: data.gender,
      probability: data.probability,
      sample_size: data.count,                    
      is_confident: data.probability >= 0.7 && data.count >= 100,
      processed_at: new Date().toISOString()      
    };

    res.status(200).json({
      status: 'success',
      data: processedData
    });

  } catch (error) {
    res.status(502).json({
      status: 'error',
      message: 'Failed to fetch from Genderize API'
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
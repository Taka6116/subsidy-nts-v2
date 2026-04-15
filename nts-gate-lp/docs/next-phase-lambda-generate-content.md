# 次フェーズ設計メモ: Lambda `generate-content`

## 処理フロー

1. `content_jobs` から `status = 'pending'` を取得
2. 対象 `subsidy_id` の `SubsidyGrant.rawPayload` を取得
3. Bedrock（Claude）へ投入  
   プロンプト例:
   - 「以下の補助金情報をもとに中小企業経営者向けの解説文を生成してください」
4. 生成結果を `generated_contents` に保存（`status = 'published'`）
5. 処理済みの `content_jobs` を `done` に更新

## リージョン構成

- Lambda: `ap-northeast-1`（東京）
- Bedrock: `us-east-1`（バージニア）Claude Sonnet

## 通信経路メモ

- Vercel（US）→ Lambda（Tokyo）→ Bedrock（Virginia）
- Lambda から Bedrock のクロスリージョン呼び出しは可能

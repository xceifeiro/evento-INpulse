-- Tabela para comentários do blog
CREATE TABLE IF NOT EXISTS blog_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para inscritos na newsletter
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

-- Configurar políticas de segurança para comentários
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- Políticas para leitura pública de comentários
CREATE POLICY "Comentários são visíveis publicamente"
ON blog_comments FOR SELECT
TO public
USING (true);

-- Políticas para inserção de comentários
CREATE POLICY "Qualquer pessoa pode adicionar comentários"
ON blog_comments FOR INSERT
TO public
WITH CHECK (true);

-- Políticas para atualização de comentários (apenas likes)
CREATE POLICY "Qualquer pessoa pode atualizar likes de comentários"
ON blog_comments FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Configurar políticas de segurança para newsletter
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Políticas para inscrição na newsletter
CREATE POLICY "Qualquer pessoa pode se inscrever na newsletter"
ON newsletter_subscribers FOR INSERT
TO public
WITH CHECK (true);

-- Políticas para administradores
CREATE POLICY "Administradores podem fazer tudo com comentários"
ON blog_comments FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin')
WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Administradores podem fazer tudo com inscritos na newsletter"
ON newsletter_subscribers FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin')
WITH CHECK (auth.jwt() ->> 'role' = 'admin');
